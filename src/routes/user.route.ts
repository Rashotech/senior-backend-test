import express from 'express';
import RequestValidator from '../middlewares/validate.middleware';
import { Container } from 'typedi';
import { LoginValidation, RegisterValidation } from '../validations';
import { UserController } from '../controllers';

const router = express.Router();

const userController = Container.get(UserController);

router.post('/users', RequestValidator.validate(RegisterValidation), userController.register);
router.post('/users/login', RequestValidator.validate(LoginValidation), userController.login);
router.get('/users', userController.getUsers);

export default router;