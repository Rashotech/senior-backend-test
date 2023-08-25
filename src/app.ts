import 'reflect-metadata';
import { Server } from 'http';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import { Service } from 'typedi';
import { useContainer } from 'typeorm';
import { Container as TypeORMContainer } from 'typeorm-typedi-extensions';

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
    this.initializeMiddleware();
    this.configureDependencyInjection();
  }

  private initializeMiddleware(): void {
    this.expressApplication.use(cors());
    this.expressApplication.use(express.json());
    this.expressApplication.use('/api/v1', routes);
    this.expressApplication.use((req: Request, _res: Response, next: NextFunction) => next(new NotFoundError(req.path)));
    this.expressApplication.use(ErrorHandler.handle());
  }

  private configureDependencyInjection(): void {
    useContainer(TypeORMContainer);
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