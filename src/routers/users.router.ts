import { Router } from 'express';
import { Userscontroller } from '../controllers/users.controller.js';
import { UserMongooseRepo } from '../repository/users.mongo.repo.js';

// eslint-disable-next-line new-cap
export const usersRouter = Router();
const repo = new UserMongooseRepo();
const controller = new Userscontroller(repo);

usersRouter.get('/', controller.register.bind(controller));
usersRouter.get('/', controller.login.bind(controller));
