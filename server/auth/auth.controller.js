import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import config from '../config/config';
import User from '../user/user.model';
import { APIsuccess, APIerror } from '../helpers/API-responses';

export const loginUserController = async (req, res) => {
  try {
    //Check errors
    const { valid, errors } = User.validateLoginData(req.body);
    if (!valid) return res.status(400).json(APIerror(400, errors));

    //Grab data
    const { email, password } = req.body;

    //Find if user exists
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json(APIerror(404, { email: "Email doesn't exist in database." }));

    //Is match password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json(APIerror(401, { msg: "Email or password doesn't match." }));

    // User Matched
    // -->

    // Create JWT Payload
    const payload = {
      id: user._id,
      username: user.username,
      email: user.email
    };

    // Sign Token with payload
    jwt.sign(payload, config.jwtSecret, { expiresIn: 36000 }, (err, token) => {
      if (err)
        return res
          .status(400)
          .json(APIerror(400, { msg: 'Something went wrong, try again later.' }));
      return res.status(200).json(APIsuccess(200, { token: 'Bearer ' + token }));
    });
  } catch (err) {
    return res.status(500).json(APIerror(500, { err }));
  }
};
