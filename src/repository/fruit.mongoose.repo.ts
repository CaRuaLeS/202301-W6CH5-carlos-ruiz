import { Fruit } from '../entites/fruit';
import { Repo } from './repo.interface';
import createDebug from 'debug';
import { FruitModel } from './fruit.mongo.model.js';
import { HTTPError } from '../interfaces/interfaces.js';
const debug = createDebug('Fruits:app');

export class FruitMongooseRepo implements Repo<Fruit> {
  constructor() {
    debug('Instantiate');
  }

  async query(): Promise<Fruit[]> {
    debug('query');
    const data = await FruitModel.find();
    return data;
  }

  async queryId(id: string): Promise<Fruit> {
    debug('queryId');
    const data = await FruitModel.findById(id);
    if (!data) throw new HTTPError(404, 'Not found', 'Id not found in queryId');
    return data;
  }

  async create(info: Partial<Fruit>): Promise<Fruit> {
    debug('create');
    const data = await FruitModel.create(info);
    if (!data)
      throw new HTTPError(
        404,
        'Can`t create',
        'Not possible to create a new one'
      );
    return data;
  }

  async update(info: Partial<Fruit>): Promise<Fruit> {
    debug('update');
    const data = await FruitModel.findByIdAndUpdate(info.id, info, {
      new: true,
    });
    if (!data)
      throw new HTTPError(404, 'Id not found', 'Id not found in update');
    return data;
  }

  async delete(id: string): Promise<void> {
    debug('delete');
    const data = await FruitModel.findByIdAndDelete(id);
    if (!data)
      throw new HTTPError(
        404,
        'Not found',
        'Delete not possible: Id not found'
      );
  }
}
