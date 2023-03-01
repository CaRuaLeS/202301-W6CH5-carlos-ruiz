import { User } from '../entites/user';
import { Repo } from './repo.interface';
import createDebug from 'debug';
import { UserModel } from './user.mongo.model.js';
import { HTTPError } from '../interfaces/interfaces.js';
const debug = createDebug('Fruits:app');

// Con el implements estamos haciendo un principio de sustitución de liskov
export class UserMongooseRepo implements Repo<User> {
  constructor() {
    debug('Instantiate');
  }

  async query(): Promise<User[]> {
    debug('query');
    return [];
  }

  async queryId(id: string): Promise<User> {
    debug('queryId');
    const data = await UserModel.findById(id);
    if (!data) throw new HTTPError(404, 'Not found', 'Id not found in queryId');
    return data;
  }

  // Este puede devolver un array vacío en vez de null, para tenerlo en cuenta con el FALSY
  async search(query: { key: string; value: unknown }) {
    debug('search');
    const data = await UserModel.find({ [query.key]: query.value });
    return data;
  }

  async create(info: Partial<User>): Promise<User> {
    debug('create');
    // El propio create al tener el modelo como está, el propio mongoose se encarga de hacer los errores
    const data = await UserModel.create(info);
    return data;
  }

  async update(info: Partial<User>): Promise<User> {
    debug('update');
    const data = await UserModel.findByIdAndUpdate(info.id, info, {
      new: true,
    });
    if (!data)
      throw new HTTPError(404, 'Id not found', 'Id not found in update');
    return data;
  }

  async delete(id: string): Promise<void> {
    debug('delete');
    const data = await UserModel.findByIdAndDelete(id);
    if (!data)
      throw new HTTPError(
        404,
        'Not found',
        'Delete not possible: Id not found'
      );
  }
}
