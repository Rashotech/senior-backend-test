import { Request } from 'express';
import { Service } from 'typedi';
import { asyncWrapper } from '../utils/asyncWrapper';
import { SuccessResponse } from '../utils/SuccessResponse';
import { UserService } from '../services';
import { StatusCodes } from 'http-status-codes';
import { IRegister } from '../interfaces/user.interface';

@Service()
export default class UserController {
  constructor(
    public userService: UserService,
  ) { }

  public register = asyncWrapper(async (req: Request) => {
    const { firstName, lastName, email, password } = req.body as IRegister;
    const response = await this.userService.register({
      firstName,
      lastName,
      email,
      password,
    });
    return new SuccessResponse('Registration Successful', response, StatusCodes.CREATED);
  });

  public login = asyncWrapper(async (req: Request) => {
    const { email, password } = req.body;
    const response = await this.userService.login({ email, password });
    return new SuccessResponse('Login Successful', response);
  });

  public getUsers = asyncWrapper(async () => {
    const response = await this.userService.find();
    return new SuccessResponse('Users fetched Successfully', response);
  });
}
