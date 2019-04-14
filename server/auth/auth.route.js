import express from 'express';

// Controllers
import { loginUserController } from './auth.controller';

const router = express.Router(); // eslint-disable-line new-cap

// @route   GET api/auth/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.route('/login').post(loginUserController);

export default router;
