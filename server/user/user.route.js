import express from 'express';
import isAuth from '../middleware/is-auth';

// Controllers
import { getUserByIdController, createUserController } from './user.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/').post(createUserController);
router.route('/:userId').get(isAuth(), getUserByIdController);

// router.route('/:userId').put(validate(paramValidation.updateUser), userCtrl.update)
// router.route('/:userId').delete(userCtrl.remove)

export default router;
