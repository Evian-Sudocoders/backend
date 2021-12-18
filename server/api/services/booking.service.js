import crypto from 'crypto';
import { nanoid } from 'nanoid';
import { razorpayKeySecret } from '../../common/constants';
import { database } from '../../common/firebase';
import l from '../../common/logger';
import razorpayInstance from '../../common/razorpay';

class BookingService {
  userCollectionRef = database.collection('users');
  stationCollectionRef = database.collection('stations');
  bookingCollectionRef = database.collection('bookings');

  async createBooking(
    userId,
    stationId,
    vehicleNumber,
    charges,
    chargingPoint,
    slots
  ) {
    try {
      const order = await razorpayInstance.orders.create({
        amount: (charges * 100).toString(),
        currency: 'INR',
        receipt: nanoid(),
      });
      const user = await this.userCollectionRef.doc(userId).get();
      const station = await this.stationCollectionRef.doc(stationId).get();
      const bookingDocumentRef = await this.bookingCollectionRef.add({
        stationId,
        userId,
        userName: user.data()?.name,
        stationName: station.data()?.name,
        address: station.data()?.address,
        vehicleNumber,
        chargingPoint,
        slots,
        orderId: order.id,
        totalAmount: charges,
        createdAt: new Date(),
        paid: false,
        status: 'pending',
      });
      return { orderId: order.id, bookingId: bookingDocumentRef.id };
    } catch (err) {
      l.error('[BOOKING: CREATE BOOKING]', err);
      throw err;
    }
  }

  async verifyBooking(
    razorpayPaymentId,
    razorpayOrderId,
    razorpaySignature,
    bookingId
  ) {
    try {
      const booking = await this.bookingCollectionRef.doc(bookingId).get();
      if (!booking.exists) {
        throw { status: 402, message: 'Order not found, please try again' };
      }
      const paymentOrderId = razorpayOrderId + '|' + razorpayPaymentId;

      const expectedSignature = crypto
        .createHmac('sha256', razorpayKeySecret)
        .update(paymentOrderId)
        .digest('hex');

      if (expectedSignature === razorpaySignature) {
        await booking.ref.update({
          paid: true,
          paidAt: new Date(),
        });
        return { message: 'Payment successfull' };
      }
      throw { status: 402, message: 'Payment verification failed' };
    } catch (err) {
      l.error('[BOOKING: VERIFY BOOKING]', err);
      throw err;
    }
  }

  async changeStatusOfABooking(bookingId) {
    try {
      const booking = await this.bookingCollectionRef.doc(bookingId).get();
      if (!booking.exists) {
        throw { status: 402, message: 'Booking not found, please try again' };
      }
      await booking.ref.update({
        status: 'success',
      });
      return { message: 'Booking updated successfully' };
    } catch (err) {
      l.error('[BOOKING: CHANGE STATUS]', err);
      throw err;
    }
  }
}

export default new BookingService();
