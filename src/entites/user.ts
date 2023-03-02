import { Fruit } from './fruit';

export type User = {
  id: string;
  email: string;
  password: string;
  fruits: Fruit[];
};
