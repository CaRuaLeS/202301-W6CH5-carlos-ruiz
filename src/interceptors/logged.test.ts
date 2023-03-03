import { Request, Response } from 'express';

import { RequestPlus } from './logged';

describe('Given the logged', () => {
  const reqPlus = {
    info: {
      id: null,
    },
  } as unknown as RequestPlus;
  const resp = {
    json: jest.fn(),
  } as unknown as Response;
  const next = jest.fn();
  describe('When ', () => {
    test('Then it should be instance', async () => {});
  });
});
