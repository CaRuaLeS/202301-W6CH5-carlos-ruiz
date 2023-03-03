import { NextFunction, Request, Response } from 'express';
import { Fruit } from '../entites/fruit.js';
import { Repo } from '../repository/repo.interface.js';
import createDebug from 'debug';
import { RequestPlus } from '../interceptors/logged.js';
import { User } from '../entites/user.js';
import { HTTPError } from '../interfaces/interfaces.js';

const debug = createDebug('Fruits:controller:fruits');

export class Fruitscontroller {
  // eslint-disable-next-line no-useless-constructor, no-unused-vars
  constructor(public repo: Repo<Fruit>, public repoUsers: Repo<User>) {
    this.repo = repo;
    this.repoUsers = repoUsers;

    debug('Instantiated fcontroller');
  }

  async getAll(_req: Request, resp: Response, next: NextFunction) {
    try {
      const data = await this.repo.query();
      resp.json({
        results: data,
      });
    } catch (error) {
      next(error);
    }
  }

  async get(req: Request, resp: Response, next: NextFunction) {
    try {
      const data = await this.repo.queryId(req.params.id);
      resp.json({
        results: [data],
      });
    } catch (error) {
      next(error);
    }
  }

  async post(req: RequestPlus, resp: Response, next: NextFunction) {
    try {
      const userId = req.info?.id;
      if (!userId) throw new HTTPError(404, 'Not found', 'User Id not found');
      // Es un await porque queryId devuelve una promesa
      const actualUser = await this.repoUsers.queryId(userId); // Tira un error si no devulve la promesa
      // Aqui estamos viendo si el ID de x y el id del token son el mismo
      req.body.owner = userId;
      const newFruit = await this.repo.create(req.body);
      // Opción bidireccional
      actualUser.fruits.push(newFruit);
      this.repoUsers.update(actualUser);

      resp.json({
        results: [newFruit],
      });
    } catch (error) {
      next(error);
    }
  }

  async patch(req: Request, resp: Response, next: NextFunction) {
    try {
      // Carefull: req.body.id = req.params.id ? req.params.id : req.body.id;
      const data = await this.repo.update(req.body);
      resp.json({
        results: [data],
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, resp: Response, next: NextFunction) {
    await this.repo.delete(req.params.id);
    resp.json({
      results: [],
    });
  }
}
