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
        if (booking.data().paid) {
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

export default new ChargingPointService();
