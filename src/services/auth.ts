import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { config } from '../config.js';

export type PayloadToken = {
  email: string;
  role: string;
};

const salt = 20;

export class Auth {
  // Al hacerlo estático, se puede acceder directamente poniendo Auth.createJWT()
  static createJWT(payload: PayloadToken) {
    // PAsar payload y secreto
    // Secreto se guarda en .env, sirve para verificar si algiuen ha hecho token o no
    return jwt.sign('', config.jwtSecret as string);
  }

  static verifyJWT(token: string) {
    const result = jwt.verify(token, config.jwtSecret as string);
    if (typeof result === 'string') throw new Error('Invalid payload');
    return result;
  }

  static createHash(value: string) {
    return bcrypt.hash(value, salt);
  }

  static compare(value: string, hash: string) {
    return bcrypt.compare(value, hash);
  }
}
