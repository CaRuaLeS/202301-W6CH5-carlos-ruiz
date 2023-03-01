import { Router } from 'express';
import { UsersController } from '../controllers/users.controller.js';
import { UserMongoRepo } from '../repository/users.mongo.repo.js';

// eslint-disable-next-line new-cap
export const usersRouter = Router();
const repo = new UserMongoRepo();
const controller = new UsersController(repo);

usersRouter.post('/register', controller.register.bind(controller));
usersRouter.post('/login', controller.login.bind(controller));
