import express from 'express';
import authHandler from '../../middlewares/auth.handler';
import controller from './controller';

export default express
  .Router()
  .get('/getUserDetails', authHandler, controller.getUserDetails)
  .post('/signupUser', authHandler, controller.signupUser)
  .post('/signupStation', authHandler, controller.signupStation);
