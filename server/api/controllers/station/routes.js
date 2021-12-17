import express from 'express';
import authHandler from '../../middlewares/auth.handler';
import controller from './controller';

export default express
  .Router()
  .get('/:state/:city', controller.getAllStations)
  .get('/:stationId', controller.getStationDetails)
  .put('/updateAddress', authHandler, controller.updateAddress)
  .post('/chargingPoints', authHandler, controller.addChargingPoints)
  .put('/chargingPoints', authHandler, controller.updateChargingPoints);
