import express from 'express';
import RequestValidator from '../middlewares/validate.middleware';
import { Container } from 'typedi';
import { LoginValidation, RegisterValidation } from '../validations';
import { UserController } from '../controllers';

const router = express.Router();

const userController = Container.get(UserController);

router.post('/', RequestValidator.validate(RegisterValidation), userController.register);
router.post('/login', RequestValidator.validate(LoginValidation), userController.login);
router.get('/', userController.getUsers);

export default router;