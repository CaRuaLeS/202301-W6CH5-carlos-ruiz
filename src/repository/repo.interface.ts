import { User } from '../entites/user';

export interface Repo<Fruit> {
  query(): Promise<Fruit[]>;
  queryId(_id: string): Promise<Fruit>;
  search(query: { key: string; value: unknown }): Promise<Fruit[]>;
  create(_info: Partial<Fruit>): Promise<Fruit>;
  update(_info: Partial<Fruit>): Promise<Fruit>;
  delete(_id: string): Promise<void>;
}
