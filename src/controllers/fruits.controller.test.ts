import { Request, Response } from 'express';
import { User } from '../entites/user';
import { FruitMongooseRepo } from '../repository/fruit.mongo.repo';
import { Repo } from '../repository/repo.interface';
import { Fruitscontroller } from './fruits.controller';

describe('Given the fruit.controller', () => {
  // Arrange
  const repo: FruitMongooseRepo = {
    create: jest.fn(),
    query: jest.fn(),
    queryId: jest.fn(),
    search: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };
  const mockRepoUsers = {} as unknown as Repo<User>;
  const req = {
    body: {},
    params: {
      id: '',
    },
  } as unknown as Request;
  const resp = {
    json: jest.fn(),
  } as unknown as Response;
  const next = jest.fn();

  const controller = new Fruitscontroller(repo, mockRepoUsers);

  describe('When the getAll', () => {
    test('Then it should be instance', async () => {
      await controller.getAll(req, resp, next);
      expect(repo.query).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });
    test('Then it should if there are errors', async () => {
      (repo.query as jest.Mock).mockRejectedValue(new Error());
      await controller.getAll(req, resp, next);
      expect(repo.query).toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
    });
  });
  describe('When the get', () => {
    test('Then it should be instance', async () => {
      await controller.get(req, resp, next);
      expect(repo.queryId).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });
    test('Then it should if there are errors', async () => {
      (repo.queryId as jest.Mock).mockRejectedValue(new Error());
      await controller.get(req, resp, next);
      expect(repo.queryId).toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
    });
  });
  describe('When the post', () => {
    test('Then it should be instance', async () => {
      await controller.post(req, resp, next);
      expect(repo.create).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });
    test('Then it should if there are errors', async () => {
      (repo.create as jest.Mock).mockRejectedValue(new Error());
      await controller.post(req, resp, next);
      expect(repo.create).toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
    });
  });
  describe('When the patch', () => {
    test('Then it should be instance', async () => {
      await controller.patch(req, resp, next);
      expect(repo.update).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });
    test('Then it should if there are errors', async () => {
      (repo.update as jest.Mock).mockRejectedValue(new Error());
      await controller.patch(req, resp, next);
      expect(repo.update).toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
    });
  });
  describe('When the patch', () => {
    test('Then it should be instance', async () => {
      await controller.delete(req, resp, next);
      expect(repo.delete).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });
  });
});
