import AuthService from '../../services/auth.service';

export class Controller {
  async signupUser(req, res, next) {
    try {
      const { name, phone, state, email, city } = req.body;
      if (!name || !email || !state || !city) {
        throw {
          status: 402,
          message: 'Please fill all necessary fields',
        };
      }
      const response = await AuthService.signupUser(
        name,
        phone,
        email,
        req.user.uid,
        state,
        city
      );
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async signupStation(req, res, next) {
    try {
      const { name, phone, address, location, state, email, city } = req.body;
      if (!name || !address || !location || !email || !state || !city) {
        throw {
          status: 402,
          message: 'Please fill all necessary fields',
        };
      }
      const response = await AuthService.signupStation(
        name,
        phone,
        email,
        req.user.uid,
        state,
        city,
        address,
        location
      );
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async getUserDetails(req, res, next) {
    try {
      const user = await AuthService.getUser(req.user.uid);
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }
}

export default new Controller();
