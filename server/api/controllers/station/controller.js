import StationService from '../../services/station.service';

export class Controller {
  async getAllStations(req, res, next) {
    try {
      const stations = await StationService.getAllStations(
        req.params.state,
        req.params.city
      );
      res.status(200).json(stations);
    } catch (error) {
      next(error);
    }
  }
}

export default new Controller();
