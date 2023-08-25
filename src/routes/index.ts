import express from 'express';
import { IRoute } from '../interfaces/common.interface';
import userRoute from './user.route';

const router = express.Router();

const allRoutes: IRoute[] = [
  {
    path: '/user',
    route: userRoute,
  },
];

allRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
