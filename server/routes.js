import authRouter from './api/controllers/auth/routes';

export default function routes(app) {
  app.use('/api/v1/auth', authRouter);
}
