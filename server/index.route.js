import express from 'express';
import userRoutes from './user/user.route';
import authRoutes from './auth/auth.route';
import isAuth from './middleware/is-auth';

const router = express.Router(); // eslint-disable-line new-cap

// Testing routes /api/test && /api/test-auth
router.get('/test', (req, res) => res.status(200).json({ success: true, user: req.user }));
router.get('/test-auth', isAuth(), (req, res) =>
  res.status(200).json({ success: true, user: req.user })
);

// Auth routes /api/auth
router.use('/auth', authRoutes);

// Users routes /api/users
router.use('/users', userRoutes);

export default router;
