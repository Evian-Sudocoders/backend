import { database } from '../../common/firebase';
import l from '../../common/logger';

class UserService {
  userCollectionRef = database.collection('users');

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
}

export default new UserService();
