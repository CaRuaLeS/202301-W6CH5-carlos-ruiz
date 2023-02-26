import { Request, Response } from 'express';
import { FruitsRepoStructure } from '../repository/fruits.file.repo.js';

export class Fruitscontroller {
  // eslint-disable-next-line no-useless-constructor, no-unused-vars
  constructor(public repo: FruitsRepoStructure) {}

  getAll(_req: Request, resp: Response) {
    this.repo.read().then((data) => resp.json(data));
  }

  get(req: Request, resp: Response) {
    const dataId = Number(req.params.id);
    this.repo
      .readById(dataId)
      .then((data) =>
        data === undefined
          ? resp.status(404).send('No id elements')
          : resp.json(data)
      );
  }

  async update(req: Request, resp: Response) {
    const data = req.body;
    this.repo.update(data).then(() => {
      resp.status(200).send(data);
    });
  }

  create(req: Request, _resp: Response) {
    console.log(req.body);
    this.repo.write(req.body).then((data) => console.log(data));
  }

  async delete(req: Request, resp: Response) {
    await this.repo.delete(Number(req.params.id));
    resp.status(200).send(`Delete id: ${req.params.id}`);
  }
}
