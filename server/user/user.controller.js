import User from './user.model';
import bcrypt from 'bcryptjs';
import { APIsuccess, APIerror } from '../helpers/API-responses';

// Get User by ID
export const getUserByIdController = async (req, res) => {
  try {
    // Get userId
    const { userId } = req.params;
    if (!userId) return res.status(400).json(APIerror(400, { userId: 'User ID is undefined.' }));

    // Find user by id
    const user = await User.get(userId);

    // No user
    if (!user)
      return res
        .status(404)
        .json(APIerror(404, { user: `User with ID: ${userId} doesn't exists.` }));

    // User exists
    return res.status(200).json(APIsuccess(200, User.sanitizeUserData(user)));
  } catch (err) {
    // Some server error
    return res.status(500).json(APIerror(500, { err }));
  }
};

// Create new user
export const createUserController = async (req, res) => {
  try {
    // Validate user data
    const { valid, errors } = await User.validateUser(req.body);
    if (!valid) return res.status(400).json(APIerror(400, { errors }));

    // Get user data
    const {
      email,
      password,
      //confirmPassword,
      mobileNumber,
      username
    } = req.body;

    // Check if user with provided email exists in db
    const isUserInDb = await User.findOne({ email });
    if (isUserInDb) return res.status(400).json(APIerror(400, { existInDb: true }));

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12); //await bcrypt.compare(password, user.password <-- hashed)

    // Create new user
    const user = new User({
      username,
      mobileNumber,
      password: hashedPassword,
      email
    });

    // Save new user to db
    const newUser = await user.save();
    return res
      .status(200)
      .json(
        APIsuccess(200, { user: 'Created.', redirect: true, user: User.sanitizeUserData(newUser) })
      );
  } catch (err) {
    return res.status(500).json(APIerror(500, { err }));
  }
};
