import express from 'express';
import { IRoute } from '../interfaces/common.interface';

const router = express.Router();

const allRoutes: IRoute[] = [];

allRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
