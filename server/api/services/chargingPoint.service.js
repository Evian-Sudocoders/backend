import { database } from '../../common/firebase';
import l from '../../common/logger';

class ChargingPointService {
  bookingCollectionRef = database.collection('bookings');

  async getBookedSlots(stationId, index) {
    try {
      const bookings = await this.bookingCollectionRef
        .where('stationId', '==', stationId)
        .where('chargingPoint', '==', parseInt(index))
        .get();
      if (bookings.empty) {
        return [];
      }
      let bookedSlots = [];
      for (let booking of bookings.docs) {
        if (
          booking.data().paid &&
          compareDateOfSlots(booking.data().createdAt._seconds)
        ) {
          bookedSlots = [...bookedSlots, ...booking.data().slots];
        }
      }
      return bookedSlots;
    } catch (error) {
      l.error('[CHARGING POINT: GET BOOKED SLOTS]', error);
      throw error;
    }
  }
}

function compareDateOfSlots(ts) {
  let date = new Date(ts * 1000);
  if (
    date.getDate() === new Date().getDate() &&
    date.getMonth() === new Date().getMonth() &&
    date.getFullYear() === new Date().getFullYear()
  ) {
    return true;
  } else {
    return false;
  }
}

export default new ChargingPointService();
