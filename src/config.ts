import dotenv from 'dotenv';
dotenv.config()

const config = {
  port: process.env.PORT,
  db: {
    name: process.env.DB_NAME ?? '',
    host: process.env.DB_HOST ?? '', 
    port: process.env.DB_PORT || 5432,
    username: process.env.DB_USERNAME ?? '',
    password: process.env.DB_PASSWORD ?? '',
  },
  environment: process.env.NODE_ENV,
  jwtSecret: process.env.JWT_SECRET ?? '',
  jwtAcessExpirationMinutes: 1440,
  jwtRefreshExpirationDays: 365,
};

export default config;
