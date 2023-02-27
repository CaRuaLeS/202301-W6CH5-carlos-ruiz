import { Request, Response } from 'express';
import { FruitsFileRepo } from '../repository/fruits.file.repo';
import { Fruitscontroller } from './fruits.controller';

describe('Given the fruit.controller', () => {
  // Arrange
  const repo: FruitsFileRepo = {
    create: jest.fn(),
    query: jest.fn(),
    queryId: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };
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

  const controller = new Fruitscontroller(repo);

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
      expect(repo.query).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });
    test('Then it should if there are errors', async () => {
      (repo.query as jest.Mock).mockRejectedValue(new Error());
      await controller.get(req, resp, next);
      expect(repo.query).toHaveBeenCalled();
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
      (repo.query as jest.Mock).mockRejectedValue(new Error());
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
      (repo.query as jest.Mock).mockRejectedValue(new Error());
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
    test('Then it should if there are errors', async () => {
      (repo.query as jest.Mock).mockRejectedValue(new Error());
      await controller.delete(req, resp, next);
      expect(repo.delete).toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
    });
  });
});
