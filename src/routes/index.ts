import express from 'express';
import { IRoute } from '../interfaces/common.interface';
import userRoute from './user.route';
import postRoute from './post.route';

const router = express.Router();

const allRoutes: IRoute[] = [
  {
    path: '/',
    route: userRoute,
  },
  {
    path: '/',
    route: postRoute,
  },
];

allRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
