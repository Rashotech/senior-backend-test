import { NextFunction, Request, Response } from "express";
import { Service } from "typedi";
import { TokenService, UserService } from "../services";
import { UnAuthorizedError } from "../utils/ApiError";

@Service()
export default class AuthMiddleware {
  constructor(
    public userService: UserService
  ) {}

  public verifyUserToken = async (req: Request, res: Response, next: NextFunction) => {
    let idToken: string;
    // Check Authorization header for token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      idToken = req.headers.authorization.split('Bearer ')[1];
    } else {
      next(new UnAuthorizedError('Unauthorized'));
    }
    try {
      // Verify and decode token
      const decodedToken = TokenService.verifyToken(idToken);
      const user = await this.userService.findById(decodedToken.sub.toString())
      if (!user) {
        next(new UnAuthorizedError('Unauthorized'));
      }

      req.user = user;
      next();
    } catch (error) {
      next(new UnAuthorizedError('Unauthorized'))
    }
  };
}