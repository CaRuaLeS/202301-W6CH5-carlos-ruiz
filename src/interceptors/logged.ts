import { Request, Response, NextFunction } from 'express';
import { HTTPError } from '../interfaces/interfaces.js';
import { Auth, PayloadToken } from '../services/auth.js';

export interface RequestPlus extends Request {
  info?: PayloadToken;
}

export function logged(req: RequestPlus, resp: Response, next: NextFunction) {
  try {
    const authHeader = req.get('Authorization'); // RECORDAR QUE ESTO ESTA FUERA DEL TRY
    if (!authHeader)
      throw new HTTPError(498, 'Token invalid', 'Header not auth');

    if (!authHeader.startsWith('Bearer'))
      throw new HTTPError(498, 'Token invalid', 'Not bearer in auth header');

    const token = authHeader.slice(7);
    const payload = Auth.verifyJWTgetPayload(token);
    req.info = payload;
    next();
  } catch (error) {
    next(error);
  }
  // 'Authorization': 'Bearer' + token
}
