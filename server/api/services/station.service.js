import { database } from '../../common/firebase';
import l from '../../common/logger';

class StationService {
  stationCollectionRef = database.collection('stations');
  bookingCollectionRef = database.collection('bookings');

  async getAllStations(state, city) {
    try {
      const stations = await this.stationCollectionRef
        .where('state', '==', state)
        .where('city', '==', city)
        .get();
      if (stations.empty) {
        return [];
      }
      let stationData = [];
      for (let station of stations.docs) {
        const chargingPointData = await this.stationCollectionRef
          .doc(station.id)
          .collection('chargingPoints')
          .orderBy('cost', 'asc')
          .get();
        stationData.push({
          id: station.id,
          name: station.data().name,
          address: station.data().address,
          numberOfChargingPoints: chargingPointData.docs.length,
          minCost: chargingPointData.docs[0]?.data().cost,
          maxCost:
            chargingPointData.docs[chargingPointData.docs.length - 1]?.data()
              .cost,
        });
      }
      return stationData;
    } catch (error) {
      l.error('[STATION: GET ALL STATIONS OF A CITY]', error);
      throw error;
    }
  }

  async getStationDetails(stationId) {
    try {
      const station = await this.stationCollectionRef.doc(stationId).get();
      if (station.exists) {
        const chargingPoints = await this.stationCollectionRef
          .doc(station.id)
          .collection('chargingPoints')
          .get();
        const chargingPointsData = chargingPoints.docs.map((doc) => {
          return {
            index: parseInt(doc.id),
            capacity: doc.data().capacity,
            cost: doc.data().cost,
          };
        });
        return {
          id: station.id,
          name: station.data().name,
          address: station.data().address,
          location: station.data().location,
          chargingPoints: chargingPointsData,
        };
      } else {
        throw { status: 402, message: 'Station not found' };
      }
    } catch (error) {
      l.error('[STATION: GET STATION DETAILS]', error);
      throw error;
    }
  }

  async updateAddress(uid, address, location) {
    try {
      await this.stationCollectionRef.doc(uid).update({
        address: address,
        location: location,
      });
      return { message: 'Address updated successfully' };
    } catch (error) {
      l.error('[STATION: UPDATE ADDRESS]', error);
      throw error;
    }
  }

  async addChargingPoints(stationId, chargingPoints) {
    try {
      const chargingPointsCollectionRef = await this.stationCollectionRef
        .doc(stationId)
        .collection('chargingPoints');
      chargingPoints.map(async (chargingPoint) => {
        await chargingPointsCollectionRef
          .doc(chargingPoint.index.toString())
          .set({
            capacity: chargingPoint.capacity,
            cost: chargingPoint.cost,
          });
      });
      return { message: 'Charging points added successfully' };
    } catch (error) {
      l.error('[STATION: ADD CHARGING POINTS]', error);
      throw error;
    }
  }

  async updateChargingPoints(stationId, chargingPoints) {
    try {
      const chargingPointsCollectionRef = await this.stationCollectionRef
        .doc(stationId)
        .collection('chargingPoints');
      chargingPoints.map(async (chargingPoint) => {
        await chargingPointsCollectionRef
          .doc(chargingPoint.index.toString())
          .update({
            capacity: chargingPoint.capacity,
            cost: chargingPoint.cost,
          });
      });
      return { message: 'Charging points updated successfully' };
    } catch (error) {
      l.error('[STATION: UPDATE CHARGING POINTS]', error);
      throw error;
    }
  }

  async getStationBookings(stationId) {
    try {
      const bookings = await this.bookingCollectionRef
        .where('stationId', '==', stationId)
        .get();
      if (bookings.empty) {
        return [];
      }
      return bookings.docs.map((doc) => doc.data());
    } catch (error) {
      l.error('[STATION: GET STATION BOOKINGS]', error);
      throw error;
    }
  }
}

export default new StationService();
