import { database } from '../../common/firebase';
import l from '../../common/logger';

class AuthService {
  userCollectionRef = database.collection('users');
  stationCollectionRef = database.collection('stations');

  async signupUser(name, phone, email, uid, state, city) {
    try {
      await this.userCollectionRef.doc(uid).set({
        name,
        phone,
        state,
        city,
        email,
        createdAt: new Date(),
      });
      return { message: 'User registered successfully' };
    } catch (error) {
      l.error('[SIGNUP SERVICE USER]', error);
      throw error;
    }
  }

  async signupStation(name, phone, email, uid, state, city, address, location) {
    try {
      await this.stationCollectionRef.doc(uid).set({
        name,
        phone,
        state,
        city,
        email,
        address,
        location,
        createdAt: new Date(),
      });
      return { message: 'Station registered successfully' };
    } catch (error) {
      l.error('[SIGNUP SERVICE STATION]', error);
      throw error;
    }
  }

  async getUser(uid) {
    try {
      const user = await this.userCollectionRef.doc(uid).get();
      if (user.exists) {
        return user.data();
      } else {
        throw new Error('User not found');
      }
    } catch (error) {
      l.error('[GET USER]', error);
      throw error;
    }
  }

  async getStation(uid) {
    try {
      const station = await this.stationCollectionRef.doc(uid).get();
      if (station.exists) {
        return station.data();
      } else {
        throw new Error('Station not found');
      }
    } catch (error) {
      l.error('[GET STATION]', error);
      throw error;
    }
  }
}

export default new AuthService();
