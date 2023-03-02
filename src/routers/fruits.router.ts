import { Router } from 'express';
import { logged } from '../interceptors/logged.js';
import { Fruitscontroller } from '../controllers/fruits.controller.js';
import { FruitMongooseRepo } from '../repository/fruit.mongo.repo.js';
import { authorized } from '../interceptors/authorized.js';
import { UserMongoRepo } from '../repository/users.mongo.repo.js';

// eslint-disable-next-line new-cap
export const fruitRouter = Router();
const repo = new FruitMongooseRepo();
const repoUsers = new UserMongoRepo();
const controller = new Fruitscontroller(repo, repoUsers);

fruitRouter.get('/', controller.getAll.bind(controller));
fruitRouter.get('/:id', logged, controller.get.bind(controller));
fruitRouter.post('/', logged, controller.post.bind(controller));
fruitRouter.patch(
  '/:id',
  logged,
  authorized,
  controller.patch.bind(controller)
);
fruitRouter.delete(
  '/:id',
  logged,
  authorized,
  controller.delete.bind(controller)
);
