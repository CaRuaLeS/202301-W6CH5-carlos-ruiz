import { FruitsFileRepo } from './fruits.file.repo';
import fs from 'fs/promises';
jest.mock('fs/promises');

describe('Given the api repo', () => {
  // Arrange
  beforeEach(() => {
    // Act
  });
  const repo = new FruitsFileRepo();
  describe('When you create a new one', () => {
    test('Then it should be instance', () => {
      expect(repo).toBeInstanceOf(FruitsFileRepo);
    });
  });
  describe('When you use query()', () => {
    test('Then it should return the data', async () => {
      // Arrange
      (fs.readFile as jest.Mock).mockResolvedValue('[]');
      // Act
      const result = await repo.query();
      //
      expect(result).toEqual([]);
    });
  });
  describe('When you use queryId()', () => {
    test('Then it should return the data', async () => {
      // Arrange
      (fs.readFile as jest.Mock).mockResolvedValue('[{"id": "1"}]');
      // Act
      const id = '1';
      const result = await repo.queryId(id);
      // Assert
      expect(fs.readFile).toHaveBeenCalled();
      expect(result).toEqual({ id: '1' });
    });
    test('Then should throw an error', () => {
      // Arrange
      (fs.readFile as jest.Mock).mockResolvedValue('[{"id": "2"}]');
      // Act
      const id = '1';

      // Assert
      expect(async () => repo.queryId(id)).rejects.toThrow();
      expect(fs.readFile).toHaveBeenCalled();
    });
  });
  describe('When you use create()', () => {
    test('Then it should return the data', async () => {
      // Arrange
      const mockNewItem = { id: '2' };
      (fs.readFile as jest.Mock).mockResolvedValue('[{"id": "1"}]');
      // Act
      const result = await repo.create(mockNewItem);
      // Assert
      const resultId = result.id;
      expect(fs.readFile).toHaveBeenCalled();
      expect(result).toEqual({ id: resultId });
    });
  });
  describe('When you use update()', () => {
    test('Then it should return the data', async () => {
      // Arrange
      const mockNewItem = { id: '1', test: 4 };
      (fs.readFile as jest.Mock).mockResolvedValue(
        '[{"id": "1", "test": "3"}]'
      );
      // Act
      const result = await repo.update(mockNewItem);
      // Assert
      expect(fs.readFile).toHaveBeenCalled();
      expect(result).toEqual({ id: '1', test: 4 });
    });
  });
  describe('When you use delete()', () => {
    test('Then it should return the data', async () => {
      // Arrange
      (fs.readFile as jest.Mock).mockResolvedValue(
        '[{"id": "1", "test": "3"}]'
      );
      // Act
      const result = await repo.delete('1');
      // Assert
      expect(fs.readFile).toHaveBeenCalled();
      expect(result).toBe(undefined);
    });
  });
});
