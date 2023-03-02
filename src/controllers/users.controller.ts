import { NextFunction, Request, Response } from 'express';
import { Repo } from '../repository/repo.interface.js';
import createDebug from 'debug';
import { User } from '../entites/user.js';
import { HTTPError } from '../interfaces/interfaces.js';
import { Auth, PayloadToken } from '../services/auth.js';
import { RequestPlus } from '../interceptors/logged.js';

const debug = createDebug('Fruits:controller:users');

export class UsersController {
  constructor(public repo: Repo<User>) {
    debug('Instantiated');
  }

  async register(req: Request, resp: Response, next: NextFunction) {
    debug('entra en register');
    try {
      debug('registerpost');
      if (!req.body.email || !req.body.password)
        throw new HTTPError(401, 'Unauthorized', 'Invalid email');
      req.body.password = await Auth.createHash(req.body.password);
      req.body.fruits = [];
      const data = await this.repo.create(req.body);
      resp.status(201);
      resp.json({
        results: [data],
      });
    } catch (error) {
      debug('nollega');
      next(error);
    }
  }

  async login(req: RequestPlus, resp: Response, next: NextFunction) {
    // Llegan datos de usurio del body
    // Search de email
    // Si lo tengo -> crear el token
    // Send el token al usuario
    // Si no lo tengo -> aviso de error
    try {
      debug('login:post');
      if (!req.body.email || !req.body.password)
        throw new HTTPError(401, 'Unauthorized', 'Invalid email');
      const data = await this.repo.search({
        key: 'email',
        value: req.body.email,
      });
      if (!data.length)
        throw new HTTPError(401, 'Unauthorized', 'Invalid email');
      if (!(await Auth.compare(req.body.password, data[0].password)))
        throw new HTTPError(401, 'Unauthorized', 'Password not match');
      const payload: PayloadToken = {
        id: data[0].id,
        email: data[0].email,
        role: 'admin',
      };
      const token = Auth.createJWT(payload);
      resp.status(202);
      resp.json({
        token,
      });
    } catch (error) {
      next(error);
    }
  }
}
