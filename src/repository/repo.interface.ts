export interface FruitsRepoStructure<Fruit> {
  query(): Promise<Fruit[]>;
  queryId(_id: string): Promise<Fruit>;
  create(_info: Partial<Fruit>): Promise<Fruit>;
  update(_info: Partial<Fruit>): Promise<Fruit>;
  delete(_id: string): Promise<void>;
}
