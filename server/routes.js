import authRouter from './api/controllers/auth/routes';
import stationRouter from './api/controllers/station/routes';
import userRouter from './api/controllers/user/routes';
import bookingRouter from './api/controllers/booking/routes';
import chargingPointRouter from './api/controllers/chargingPoint/routes';

export default function routes(app) {
  app.use('/api/v1/auth', authRouter);
  app.use('/api/v1/user', userRouter);
  app.use('/api/v1/station', stationRouter);
  app.use('/api/v1/booking', bookingRouter);
  app.use('/api/v1/chargingPoint', chargingPointRouter);
}
