import fs from 'fs/promises';
import { Fruit } from '../entites/fruit';
import { FruitsRepoStructure } from './repo.interface';

const file = 'data/fruits.json';

export class FruitsFileRepo implements FruitsRepoStructure<Fruit> {
  async query(): Promise<Fruit[]> {
    const initialData: string = await fs.readFile(file, { encoding: 'utf-8' });
    return JSON.parse(initialData);
  }

  async queryId(id: string): Promise<Fruit> {
    const initialData: string = await fs.readFile(file, { encoding: 'utf-8' });
    const data: Fruit[] = JSON.parse(initialData);
    const finalData = data.find((item) => item.id === id);
    if (!finalData) throw new Error('Id not found');
    return finalData;
  }

  async create(info: Partial<Fruit>): Promise<Fruit> {
    // Future if (!validateInfo(info)) throw new Error('Not valid data');
    const initialData: string = await fs.readFile(file, { encoding: 'utf-8' });
    const data: Fruit[] = JSON.parse(initialData);
    info.id = String(Math.floor(Math.random() * 1000_000));
    const finalData = [...data, info];
    await fs.writeFile(file, JSON.stringify(finalData), 'utf-8');
    return info as Fruit;
  }

  async update(info: Partial<Fruit>): Promise<Fruit> {
    if (!info.id) throw new Error('Not valid data');
    const initialData: string = await fs.readFile(file, { encoding: 'utf-8' });
    const data: Fruit[] = JSON.parse(initialData);
    let updatedItem: Fruit = {} as Fruit;
    const finalData = data.map((item) => {
      if (item.id === info.id) {
        updatedItem = { ...item, ...info };
        return updatedItem;
      }

      return item;
    });

    if (!updatedItem.id) throw new Error('Id not found');
    await fs.writeFile(file, JSON.stringify(finalData), 'utf-8');
    return updatedItem as Fruit;
  }

  async delete(id: string): Promise<void> {
    const initialData: string = await fs.readFile(file, {
      encoding: 'utf-8',
    });
    const data: Fruit[] = JSON.parse(initialData);
    const index = data.findIndex((item) => item.id === id);
    if (index < 0) throw new Error('Id not found');
    data.slice(index, 1);
    fs.writeFile(file, JSON.stringify(data), 'utf-8');
  }
}
