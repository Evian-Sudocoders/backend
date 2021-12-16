import StationService from '../../services/station.service';

export class Controller {
  async getAllStations(req, res, next) {
    try {
      const stations = await StationService.getAllStations(
        req.params.state,
        req.params.city
      );
      res.status(200).json({ stations: stations });
    } catch (error) {
      next(error);
    }
  }

  async getStationDetails(req, res, next) {
    try {
      const station = await StationService.getStationDetails(
        req.params.stationId
      );
      res.status(200).json(station);
    } catch (error) {
      next(error);
    }
  }
}

export default new Controller();
