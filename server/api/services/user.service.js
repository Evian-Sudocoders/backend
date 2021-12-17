import { database } from '../../common/firebase';
import l from '../../common/logger';

class UserService {
  userCollectionRef = database.collection('users');
  bookingCollectionRef = database.collection('bookings');

  async updateProfilePicture(uid, image) {
    try {
      await this.userCollectionRef.doc(uid).update({
        profilePicture: image,
      });
      return { message: 'Profile picture updated successfully' };
    } catch (error) {
      l.error('[USER: UPDATE PROFILE PICTURE]', error);
      throw error;
    }
  }

  async getUserBookings(userId) {
    try {
      const bookings = await this.bookingCollectionRef
        .where('userId', '==', userId)
        .get();
      if (bookings.empty) {
        return [];
      }
      return bookings.docs.map((booking) => {
        return {
          id: booking.id,
          stationName: booking.data().stationName,
          address: booking.data().address,
          chargingPoint: booking.data().chargingPoint,
          createdAt: booking.data().createdAt,
          slots: booking.data().slots,
          totalAmount: booking.data().totalAmount,
          status: booking.data().status,
        };
      });
    } catch (error) {
      l.error('[USER: GET USER BOOKINGS]', error);
      throw error;
    }
  }
}

export default new UserService();
