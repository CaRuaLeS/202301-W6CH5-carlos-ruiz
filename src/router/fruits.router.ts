import { Router } from 'express';
import { Fruitscontroller } from '../controllers/fruits.controller';
import { FruitsFileRepo } from '../repository/fruits.file.repo';

// eslint-disable-next-line new-cap
export const fruitRouter = Router();
export const repo = new FruitsFileRepo();
const controller = new Fruitscontroller(repo);

fruitRouter.get('/', controller.getAll.bind(controller));
