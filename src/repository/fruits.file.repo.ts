/* eslint-disable no-unused-vars */
import fs from 'fs/promises';

const file = 'data/fruits.json';

export type Fruit = {
  name: string;
  color: string;
  weigth: number;
};

export interface FruitsRepoStructure {
  read(): Promise<Fruit[]>;
  write(info: Fruit): Promise<string>;
}

export class FruitsFileRepo {
  read() {
    return fs
      .readFile(file, { encoding: 'utf-8' })
      .then((data) => JSON.parse(data) as Fruit[]);
  }

  async write(info: Fruit) {
    const data = await fs.readFile(file, { encoding: 'utf-8' });
    const dataParsed: Fruit[] = JSON.parse(data);
    const finalData = JSON.stringify([...dataParsed, info]);
    await fs.writeFile(file, finalData, { encoding: 'utf-8' });
    return 'Writed';
  }
}
