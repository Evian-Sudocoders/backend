import authRouter from './api/controllers/auth/routes';
import stationRouter from './api/controllers/station/routes';

export default function routes(app) {
  app.use('/api/v1/auth', authRouter);
  app.use('/api/v1/station', stationRouter);
}
