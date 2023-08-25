import logger from '../utils/logger';
import { AppDataSource } from './data-source';

const dbCreateConnection = async () => {
  try {
    await AppDataSource.initialize();
    logger.info(`Database connected`);
  } catch (err) {
    logger.error("Database Connection Error", err);
  }
};

export default dbCreateConnection;