import UserService from '../../services/user.service';

export class Controller {
  async updateProfilePicture(req, res, next) {
    try {
      const { imageUrl } = req.body;
      if (!imageUrl) {
        throw {
          status: 402,
          message: 'Image Url is required',
        };
      }
      const response = await UserService.updateProfilePicture(
        req.user.uid,
        imageUrl
      );
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async getUserBookings(req, res, next) {
    try {
      const bookings = await UserService.getUserBookings(req.user.uid);
      res.status(200).json({ bookings });
    } catch (error) {
      next(error);
    }
  }
}

export default new Controller();
