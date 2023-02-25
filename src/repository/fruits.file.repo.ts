/* eslint-disable no-unused-vars */
import fs from 'fs/promises';

const file = 'data/fruits.json';

export type Fruit = {
  id: number;
  name: string;
  color: string;
  weigth: number;
};

export interface FruitsRepoStructure {
  read(): Promise<Fruit[]>;
  readById(id: Fruit['id']): Promise<Fruit>;
  write(info: Fruit): Promise<void>;
  update(info: Fruit): Promise<void>;
  delete(id: Fruit['id']): Promise<void>;
}

export class FruitsFileRepo implements FruitsRepoStructure {
  read() {
    return fs
      .readFile(file, { encoding: 'utf-8' })
      .then((data) => JSON.parse(data) as Fruit[]);
  }

  async readById(id: Fruit['id']) {
    const data = await fs.readFile(file, { encoding: 'utf-8' }).then((data) => {
      const dataParsed: Fruit[] = JSON.parse(data);
      const finalData = dataParsed.filter((item) => item.id === id)[0];
      return finalData;
    });
    return data;
  }

  async write(info: Fruit) {
    const data = await fs.readFile(file, { encoding: 'utf-8' });
    const dataParsed: Fruit[] = JSON.parse(data);
    const maxIdData: number = Math.max(...dataParsed.map((item) => item.id));
    info.id = maxIdData + 1;
    const finalData = JSON.stringify([...dataParsed, info]);
    await fs.writeFile(file, finalData, { encoding: 'utf-8' });
  }

  async update(info: Fruit) {
    const data = await fs.readFile(file, { encoding: 'utf-8' });
    const dataParsed: Fruit[] = JSON.parse(data);
    const finalData = JSON.stringify(
      dataParsed.map((item) => (item.id === info.id ? info : item))
    );
    await fs.writeFile(file, finalData, { encoding: 'utf-8' });
  }

  async delete(id: Fruit['id']) {
    const data = await fs.readFile(file, { encoding: 'utf-8' });
    const dataParsed: Fruit[] = JSON.parse(data);
    const dataFiltered = dataParsed.filter((item) => item.id !== id);
    const finalData = JSON.stringify(dataFiltered);
    await fs.writeFile(file, finalData, { encoding: 'utf-8' });
  }
}