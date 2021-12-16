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
          .orderBy('index', 'asc')
          .get();
        const chargingPointsData = chargingPoints.docs.map((doc) => doc.data());
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
}

export default new StationService();
