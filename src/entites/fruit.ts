import { User } from './user';

export type Fruit = {
  id: string;
  name: string;
  color: string;
  weight: number;
  owner: User;
};
