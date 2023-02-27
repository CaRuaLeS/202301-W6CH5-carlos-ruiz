import { Router } from 'express';
import { Fruitscontroller } from '../controllers/fruits.controller.js';
import { FruitsFileRepo } from '../repository/fruits.file.repo.js';

// eslint-disable-next-line new-cap
export const fruitRouter = Router();
export const repo = new FruitsFileRepo();
const controller = new Fruitscontroller(repo);

fruitRouter.get('/', controller.getAll.bind(controller));
fruitRouter.get('/:id', controller.get.bind(controller));
fruitRouter.post('/', controller.post.bind(controller));
fruitRouter.patch('/:id', controller.patch.bind(controller));
fruitRouter.delete('/:id', controller.delete.bind(controller));
