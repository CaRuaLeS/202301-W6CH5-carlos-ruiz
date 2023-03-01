import { NextFunction, Request, Response } from 'express';
import { Repo } from '../repository/repo.interface.js';
import createDebug from 'debug';
import { User } from '../entites/user.js';
import { HTTPError } from '../interfaces/interfaces.js';
import { Auth, PayloadToken } from '../services/auth.js';

const debug = createDebug('Users:controller');

export class Userscontroller {
  // eslint-disable-next-line no-useless-constructor, no-unused-vars
  constructor(public repo: Repo<User>) {
    this.repo = repo;
    debug('Instantiated');
  }

  async register(req: Request, resp: Response, next: NextFunction) {
    try {
      debug('register:post');
      if (!req.body.email || !req.body.password)
        throw new HTTPError(401, 'Unauthorized', 'Invalid email');
      req.body.password = await Auth.createHash(req.body.password);
      const data = await this.repo.create(req.body);
      resp.status(201);
      resp.json({
        results: [data],
      });
      debug(data);
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, resp: Response, next: NextFunction) {
    // Llegan datos de usurio del body
    // Search de email
    // Si lo tengo -> crear el token
    // Send el token al usuario
    // Si no lo tengo -> aviso de error
    try {
      debug('register:login');
      if (!req.body.email || !req.body.password)
        throw new HTTPError(401, 'Unauthorized', 'Invalid email');
      const data = await this.repo.search({
        key: 'email',
        value: req.body.email,
      });
      if (!data.length)
        throw new HTTPError(401, 'Unauthorized', 'Invalid email');

      if (data[0].password !== req.body.password)
        throw new HTTPError(401, 'Unauthorized', 'Invalid email');

      const payload: PayloadToken = {
        email: data[0].email,
        role: 'admin',
      };
      const token = Auth.createJWT(payload);

      if (!(await Auth.compare(req.body.password, data[0].password)))
        throw new HTTPError(401, 'Unauthorized', 'Invalid Aa');

      resp.json({
        results: { token },
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, resp: Response, next: NextFunction) {
    try {
      this.repo.delete(req.params.id);
      resp.json({
        results: [],
      });
    } catch (error) {
      next(error);
    }
  }
}
