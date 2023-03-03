import { Request, Response } from 'express';
import { User } from '../entites/user';
import { RequestPlus } from '../interceptors/logged';
import { FruitMongooseRepo } from '../repository/fruit.mongo.repo';
import { Repo } from '../repository/repo.interface';
import { PayloadToken } from '../services/auth';
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
  const mockRepoUsers = {
    queryId: jest.fn(),
    update: jest.fn(),
  } as unknown as Repo<User>;
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
  describe('When the post method is called', () => {
    test('Then if userID is false it should call next', async () => {
      const reqPlus = {
        info: {
          id: null,
        },
      } as unknown as RequestPlus;

      await controller.post(reqPlus, resp, next);
      expect(next).toHaveBeenCalled();
    });
    test('Then if everything is OK', async () => {
      const reqPlus = {
        body: {},
        info: {
          id: '1234',
        },
      } as unknown as RequestPlus;
      (mockRepoUsers.queryId as jest.Mock).mockResolvedValue({ fruits: [] });

      await controller.post(reqPlus, resp, next);
      expect(mockRepoUsers.queryId).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
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
  describe('When the delete', () => {
    test('Then it should be instance', async () => {
      await controller.delete(req, resp, next);
      expect(repo.delete).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });
  });
});
