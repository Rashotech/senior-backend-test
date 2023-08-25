import { Container } from 'typedi';
import { App } from './app';
import ErrorHandler from './middlewares/error.middleware';

const application = Container.get(App);
const server = application.startExpressServer();

ErrorHandler.initializeUnhandledException();

process.on('SIGTERM', async () => {
  console.info('SIGTERM received');
  if (server) (await server).close();
});