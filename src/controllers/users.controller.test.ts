import { Request, Response } from 'express';
import { User } from '../entites/user';
import { Repo } from '../repository/repo.interface';
import { Auth } from '../services/auth';
import { UsersController } from './users.controller';

jest.mock('../services/auth');

describe('Given the register constroller', () => {
  // Arrange

  // Lo hacemos con unknown y repo para mockear el repo en vez de traer el repo entero y tener que pone rtodas las funciones
  const mockRepo = {
    create: jest.fn(),
    search: jest.fn(),
  } as unknown as Repo<User>;

  const req = {
    body: {},
  } as unknown as Request;
  const resp = {
    status: jest.fn(),
    json: jest.fn(),
  } as unknown as Response;
  const next = jest.fn();

  const controller = new UsersController(mockRepo);

  describe('When se use the register', () => {
    test('Then it calls correctly', async () => {
      const req = {
        body: {
          email: 'pepe',
          password: 'test',
        },
      } as unknown as Request;

      await controller.register(req, resp, next);
      expect(resp.json).toHaveBeenCalled();
    });
    test('Then it should call next if theres NO email and password', async () => {
      const req = {
        body: {},
      } as unknown as Request;
      await controller.register(req, resp, next);
      expect(next).toHaveBeenCalled();
    });
  });
});

describe('Given the login function', () => {
  const mockRepo = {
    create: jest.fn(),
    search: jest.fn(),
  } as unknown as Repo<User>;

  const req = {
    body: {
      email: 'foo',
      password: 'test',
    },
  } as unknown as Request;
  const resp = {
    status: jest.fn(),
    json: jest.fn(),
  } as unknown as Response;
  const next = jest.fn();

  const controller = new UsersController(mockRepo);

  Auth.createJWT = jest.fn();

  describe('When we use the login', () => {
    (mockRepo.search as jest.Mock).mockResolvedValue(['test']);
    test('Then when all is OK', async () => {
      Auth.compare = jest.fn().mockResolvedValue(true);
      await controller.login(req, resp, next);
      expect(resp.json).toHaveBeenCalled();
    });
    test('Then it theres no password it should call next', async () => {
      const req = {
        body: {
          email: 'pepe',
          password: '',
        },
      } as unknown as Request;
      await controller.login(req, resp, next);
      expect(next).toHaveBeenCalled();
    });
    test('Then when the auth is false it should catch next', async () => {
      Auth.compare = jest.fn().mockResolvedValue(false);

      (mockRepo.search as jest.Mock).mockResolvedValue(['test']);
      await controller.login(req, resp, next);
      expect(next).toHaveBeenCalled();
    });
    test('Then when the data is false it should catch next', async () => {
      Auth.compare = jest.fn().mockResolvedValue(true);

      (mockRepo.search as jest.Mock).mockResolvedValue([]);
      await controller.login(req, resp, next);
      expect(next).toHaveBeenCalled();
    });
  });
});
