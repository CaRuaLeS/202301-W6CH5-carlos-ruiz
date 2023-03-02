import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { config } from '../config.js';
import { HTTPError } from '../interfaces/interfaces.js';

export interface PayloadToken extends jwt.JwtPayload {
  id: string;
  email: string;
  role: string;
}

const salt = 10;

export class Auth {
  // Al hacerlo estático, se puede acceder directamente poniendo Auth.createJWT()
  static createJWT(payload: PayloadToken) {
    // PAsar payload y secreto
    // Secreto se guarda en .env, sirve para verificar si algiuen ha hecho token o no
    return jwt.sign(payload, config.jwtSecret as string);
  }

  static verifyJWTgetPayload(token: string): PayloadToken {
    const result = jwt.verify(token, config.jwtSecret as string);
    if (typeof result === 'string')
      throw new HTTPError(498, 'Invalid payload', `${result}`);
    return result as PayloadToken;
  }

  static createHash(value: string) {
    return bcrypt.hash(value, salt);
  }

  static compare(value: string, hash: string) {
    return bcrypt.compare(value, hash);
  }
}
