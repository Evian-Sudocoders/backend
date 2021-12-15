import { auth } from '../../common/firebase';
import errorHandler from './error.handler';

export default async function authHandler(req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      throw { status: 401, message: 'Unauthorized' };
    }
    const decoded = await auth.verifyIdToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    errorHandler(error, req, res, next);
  }
}
