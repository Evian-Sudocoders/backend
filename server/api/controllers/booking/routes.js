import express from 'express';
import authHandler from '../../middlewares/auth.handler';
import controller from './controller';

export default express
  .Router()
  .put('/:bookingId', authHandler, controller.changeStatusOfABooking)
  .post('/initializeBooking', authHandler, controller.createBooking)
  .post('/verifyBooking', authHandler, controller.verifyBooking);
