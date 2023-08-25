import 'reflect-metadata';
import { Server } from 'http';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import { Service } from 'typedi';

import config from './config';
import logger from './utils/logger';
import routes from './routes';
import dbCreateConnection from './database/db-connection';
import { NotFoundError } from './utils/ApiError';
import ErrorHandler from './middlewares/error.middleware';

@Service()
export class App {
  public readonly expressApplication: express.Application;

  constructor() {
    this.expressApplication = express();
    this.initializeMiddlewares();
    this.initializeRoutes();
  }

  private initializeMiddlewares(): void {
    this.expressApplication.use(cors());
    this.expressApplication.use(express.json());
  }

  private initializeRoutes(): void {
    this.expressApplication.use(routes);
    this.expressApplication.use((req: Request, _res: Response, next: NextFunction) => 
    next(new NotFoundError(`The requested path ${req.path} not found!`)));
    this.expressApplication.use(ErrorHandler.handle());
  }

  public async startExpressServer(): Promise<Server> {
    await dbCreateConnection();
    const server = this.expressApplication.listen(config.port);

    if (server) {
      logger.info(`Server listening on port: ${config.port}.`);
    }

    return server;
  }
}