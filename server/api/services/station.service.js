import { database } from '../../common/firebase';
import l from '../../common/logger';

class StationService {
  stationCollectionRef = database.collection('stations');

  async getAllStations(state, city) {
    try {
      const stations = await this.stationCollectionRef
        .where('state', '==', state)
        .where('city', '==', city)
        .get();
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
          minCost: chargingPointData.docs[0].data().cost,
          maxCost:
            chargingPointData.docs[chargingPointData.docs.length - 1].data()
              .cost,
        });
      }
      return stationData;
    } catch (error) {
      l.error('[CHEF: GET ALL STATIONS OF A CITY]', error);
      throw error;
    }
  }
}

export default new StationService();
