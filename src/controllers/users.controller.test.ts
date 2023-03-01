import { Request, Response } from 'express';
import { UserMongoRepo } from '../repository/users.mongo.repo';
import { UsersController } from './users.controller';

describe('Given the users.controller', () => {
  // Arrange
  const repo: UserMongoRepo = {
    create: jest.fn(),
    query: jest.fn(),
    queryId: jest.fn(),
    search: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };
  const resp = {
    status: jest.fn(),
    json: jest.fn(),
  } as unknown as Response;
  const next = jest.fn();

  const controller = new UsersController(repo);

  describe('When the register', () => {
    test('Then it should be instance', async () => {
      const req = {
        body: {
          email: 'cosa@gmail.com',
          password: 'qewrty1234',
        },
      } as unknown as Request;
      await controller.register(req, resp, next);
      expect(repo.create).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });
    test('Then it should if there are errors', async () => {
      const req = {
        body: {
          email: 'cosa@gmail.com',
          password: 'qewrty1234',
        },
      } as unknown as Request;
      (repo.create as jest.Mock).mockRejectedValue(new Error());
      await controller.register(req, resp, next);
      expect(repo.create).toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
    });
  });
  describe('When the login', () => {
    const req = {
      body: {
        email: 'cosa@gmail.com',
        password: 'qewrty1234',
      },
    } as unknown as Request;
    test('Then it should be instance', async () => {
      await controller.login(req, resp, next);
      expect(repo.search).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });
    test('Then it should if there are errors', async () => {
      (repo.search as jest.Mock).mockRejectedValue(new Error());
      await controller.login(req, resp, next);
      expect(repo.search).toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
    });
  });
});
