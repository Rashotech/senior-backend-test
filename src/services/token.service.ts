import { BadRequestError } from '../utils/ApiError';
import { Service } from 'typedi';
import moment from 'moment';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import logger from '../utils/logger';

@Service()
export default class TokenService {
  /**
   * Generate JWT Token
   */
  public static generateToken(userId: string): string {
    try {
      const expires = moment().add(config.jwtAcessExpirationMinutes, 'minutes');
      const payload = {
        sub: userId,
        iat: moment().unix(),
        exp: expires.unix(),
      };
      return jwt.sign(payload, config.jwtSecret);
    } catch (error) {
      logger.error(error);
      throw new BadRequestError('An error occured');
    }
  }

  /**
   * Verify JWT Token
   */
  public static verifyToken(token: string): JwtPayload | string {
    try {
      const payload = jwt.verify(token, config.jwtSecret);
      return payload;
    } catch (error) {
      logger.error(error);
      throw new BadRequestError('An error occured');
    }
  }
}
