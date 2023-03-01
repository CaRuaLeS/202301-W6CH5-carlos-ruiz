import { FruitModel } from './fruit.mongo.model';
import { FruitMongooseRepo } from './fruit.mongoose.repo';

jest.mock('./fruit.mongo.model');

describe('Given FruitMongoRepo', () => {
  const repo = new FruitMongooseRepo();

  describe('When i use query', () => {
    test('Then should return the data', async () => {
      (FruitModel.find as jest.Mock).mockResolvedValue([]);
      const result = await repo.query();

      expect(FruitModel.find).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });
  describe('When you use queryId()', () => {
    test('Then it should return the data', async () => {
      // Arrange
      (FruitModel.findById as jest.Mock).mockResolvedValue({ id: '1' });
      // Act
      const id = '1';
      const result = await repo.queryId(id);
      // Assert
      expect(FruitModel.findById).toHaveBeenCalled();
      expect(result).toEqual({ id: '1' });
    });
    test('Then should throw an error', () => {
      // Arrange
      (FruitModel.findById as jest.Mock).mockResolvedValue(undefined);
      // Act
      const id = '1';
      // Assert
      expect(async () => repo.queryId(id)).rejects.toThrow();
      expect(FruitModel.findById).toHaveBeenCalled();
    });
  });
  describe('When you use create()', () => {
    test('Then it should return the data', async () => {
      // Arrange
      const mockNewItem = { id: '2' };
      (FruitModel.create as jest.Mock).mockResolvedValue({ id: '1' });
      // Act
      const result = await repo.create(mockNewItem);
      // Assert
      const resultId = result.id;
      expect(FruitModel.create).toHaveBeenCalled();
      expect(result).toEqual({ id: resultId });
    });
  });
  describe('When you use update()', () => {
    test('Then it should return the data', async () => {
      // Arrange
      const mockNewItem = { id: '1', test: 3 };
      (FruitModel.findByIdAndUpdate as jest.Mock).mockResolvedValue({
        id: '1',
        test: 3,
      });
      // Act
      const result = await repo.update(mockNewItem);
      // Assert
      expect(FruitModel.findByIdAndUpdate).toHaveBeenCalled();
      expect(result).toEqual({ id: '1', test: 3 });
    });
    test('Then should throw an error', () => {
      // Arrange
      (FruitModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(undefined);
      // Act
      const mockNewItem = { id: '1', test: 3 };

      // Assert
      expect(async () => repo.update(mockNewItem)).rejects.toThrow();
      expect(FruitModel.findByIdAndUpdate).toHaveBeenCalled();
    });
  });
  describe('When i use search', () => {
    test('Then it should return what i serched for', async () => {
      (FruitModel.find as jest.Mock).mockResolvedValue([
        {
          key: 'some',
          value: 'fruit',
        },
      ]);

      const result = await repo.search({ key: 'some', value: 'oso' });
      expect(FruitModel.find).toHaveBeenCalled();
      expect(result).toEqual([
        {
          key: 'some',
          value: 'fruit',
        },
      ]);
    });
  });
  describe('When you use delete()', () => {
    test('Then it should return the data', async () => {
      // Arrange
      (FruitModel.findByIdAndDelete as jest.Mock).mockResolvedValue(
        '[{"id": "1", "test": "3"}]'
      );
      // Act
      const result = await repo.delete('1');
      // Assert
      expect(result).toBeUndefined();
    });
    test('Then should throw an error', () => {
      // Arrange
      (FruitModel.findByIdAndDelete as jest.Mock).mockResolvedValue(undefined);
      // Act

      // Assert
      expect(async () => repo.delete('1')).rejects.toThrow();
      expect(FruitModel.findByIdAndDelete).toHaveBeenCalled();
    });
  });
});
