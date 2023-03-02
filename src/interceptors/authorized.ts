import { NextFunction, Request, Response } from 'express';
import { HTTPError } from '../interfaces/interfaces.js';
import { Auth } from '../services/auth.js';
import { RequestPlus } from './logged.js';

export function authorized(
  req: RequestPlus,
  resp: Response,
  next: NextFunction
) {
  const authHeader = req.get('Authorization'); // RECORDAR QUE ESTO ESTA FUERA DEL TRY
  try {
    if (!authHeader)
      throw new HTTPError(498, 'Token invalid', 'Header not auth');

    if (!authHeader.startsWith('Bearer'))
      throw new HTTPError(498, 'Token invalid', 'Not bearer in auth header');

    const token = authHeader.slice(6);
    const payload = Auth.verifyJWTgetPayload(token);
    req.info = payload;
    next();
  } catch (error) {
    next(error);
  }
  // 'Authorization': 'Bearer' + token
}
