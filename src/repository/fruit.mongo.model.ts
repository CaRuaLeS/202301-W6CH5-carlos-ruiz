import { model, Schema } from 'mongoose';
import { Fruit } from '../entites/fruit.js';

const fruitSchema = new Schema<Fruit>({
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
});

// Para devolver hacia fuera los datos sin necesidad de ver el _id y __v en postman
// Borra elementos que hace el propio mongo
fruitSchema.set('toJSON', {
  transform(_document, returnedObject) {
    returnedObject.id = returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject._id;
    delete returnedObject.password;
  },
});

export const FruitModel = model('Fruit', fruitSchema, 'fruits');
// El model es un objecto, que es un createModel en realidad
// Con el modelo tiene el nombre de la colección, se pone el plural y en minuscula
