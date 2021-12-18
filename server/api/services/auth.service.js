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
        profilePicture:
          'https://s3-alpha-sig.figma.com/img/add1/75d2/10c497455f79cd54356f8b1580320962?Expires=1640563200&Signature=ZN-bH~otrw1Bp5SBdME9woz597ncstqa5rNsHPhQpoLPhKkrU6s6BHhwzj1UdVRwqiKwVRgyUmkCuoXQ7jPfNFbdPUXpWpbGevUcpxHwxwLMsmuwdVypt1DfEFTviTvWK3rfbYG-WinF-JOAe-P1nMXX7FaUy3t1~v~SIc1JttLSQ09S-sMDl8b7~WT~YDB27ibKOrUpU5U1RMk-9nSMWe3yRHWbuubuE-lLc2OgICSxJzZcUpd2JfPQf0o7hEJby0NiRIoP8NIB23EVSikcLMdy0ZGHkYGzv2btKE0sxpyib6Co~Z5Sxs8acrUlOLpzInNNoGSEt3KqCAefjiawaA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
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
      }

      const station = await this.stationCollectionRef.doc(uid).get();
      if (station.exists) {
        const datatoReturn = station.data();
        datatoReturn.isStation = true;
        return datatoReturn;
      } else {
        throw { status: 402, message: 'User not found' };
      }
    } catch (error) {
      l.error('[GET USER]', error);
      throw error;
    }
  }
}

export default new AuthService();
