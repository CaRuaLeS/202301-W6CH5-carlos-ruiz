import { NextFunction, Response } from 'express';
import { HTTPError } from '../interfaces/interfaces.js';
import { FruitMongoRepo } from '../repository/fruit.mongo.repo.js';
import { RequestPlus } from './logged.js';

export async function authorized(
  req: RequestPlus,
  resp: Response,
  next: NextFunction,
  fruitRepo: FruitMongoRepo
) {
  const authHeader = req.get('Authorization'); // RECORDAR QUE ESTO ESTA FUERA DEL TRY
  try {
    // Tengo el id del usuario (req.info.id)
    if (!req.info)
      throw new HTTPError(
        498,
        'Invalid token',
        'Token not found in authorized'
      );
    const userId = req.info.id;
    // Tengo el id de la cosa (req.params.id)
    const fruitId = req.params.id;
    // Busco la cosa

    const actualFruit = await fruitRepo.queryId(fruitId);
    // Comparo cosa.owner.id con req.info.id
    if (actualFruit.owner.id === userId)
      throw new HTTPError(
        401,
        'Not authorized',
        'The id fruit not match the userId'
      );

    next();
  } catch (error) {
    next(error);
  }
  // 'Authorization': 'Bearer' + token
}
