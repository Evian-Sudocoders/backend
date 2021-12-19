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

  async updateAddress(req, res, next) {
    try {
      const { address, location } = req.body;
      if (!address || !location) {
        throw {
          status: 402,
          message: 'Please provide address and location',
        };
      }
      const response = await StationService.updateAddress(
        req.user.uid,
        address,
        location
      );
      res.status(200).json(response);
    } catch (error) {
      return next(error);
    }
  }

  async addChargingPoints(req, res, next) {
    try {
      const { chargingPoints } = req.body;
      if (chargingPoints.length === 0)
        throw {
          status: 402,
          message: 'Minimum one charging point is required',
        };
      const response = await StationService.addChargingPoints(
        req.user.uid,
        chargingPoints
      );
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async updateChargingPoints(req, res, next) {
    try {
      const { chargingPoints } = req.body;
      if (chargingPoints.length === 0)
        throw {
          status: 402,
          message: 'Minimum one charging point is required',
        };
      const response = await StationService.updateChargingPoints(
        req.user.uid,
        chargingPoints
      );
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async getStationBookings(req, res, next) {
    try {
      const bookings = await StationService.getStationBookings(req.user.uid);
      res.status(200).json({ bookings });
    } catch (error) {
      next(error);
    }
  }
}

export default new Controller();
