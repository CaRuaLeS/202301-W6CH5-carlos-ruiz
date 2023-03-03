import { Request, Response } from 'express';

import { logged, RequestPlus } from './logged';

describe('Given the logged', () => {
  const mockReqPlus = {
    get: jest.fn(),
  } as unknown as RequestPlus;
  const mockResp = {
    json: jest.fn(),
  } as unknown as Response;
  const mockNext = jest.fn();
  describe('When ', () => {
    test('Then it should be instance', async () => {
      (mockReqPlus.get as jest.Mock).mockResolvedValue('');
      const result = await logged(mockReqPlus, mockResp, mockNext);
      expect(mockNext).toHaveBeenCalled();
    });
  });
});
