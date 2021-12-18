import ChargingPointService from '../../services/chargingPoint.service';

export class Cotroller {
  async getBookedSlots(req, res, next) {
    try {
      const bookedSlots = await ChargingPointService.getBookedSlots(
        req.params.stationId,
        req.params.index
      );
      res.status(200).json({ bookedSlots });
    } catch (error) {
      next(error);
    }
  }
}

export default new Cotroller();
