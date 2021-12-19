import express from 'express';
import authHandler from '../../middlewares/auth.handler';
import controller from './controller';

export default express
  .Router()
  .put('/updateProfilePicture', authHandler, controller.updateProfilePicture)
  .get('/bookings', authHandler, controller.getUserBookings);
