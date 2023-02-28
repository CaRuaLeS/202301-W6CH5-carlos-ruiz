import { model, Schema } from 'mongoose';
import { Fruit } from '../entites/fruit.js';

const fruitSchema = new Schema<Fruit>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  color: {
    type: String,
    required: true,
    unique: true,
  },
  weight: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
});

export const FruitModel = model('Fruit', fruitSchema, 'fruits');
