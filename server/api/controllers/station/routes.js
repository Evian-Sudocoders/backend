import express from 'express';
// import authHandler from '../../middlewares/auth.handler';
import controller from './controller';

export default express.Router().get('/:state/:city', controller.getAllStations);
//   .put('/updateAddress', authHandler, controller.updateAddress)
//   .post('/chargingPoints', authHandler, controller.createChargingPoints)
//   .put('/chargingPoints', authHandler, controller.updateChargingPoints);
