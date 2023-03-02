import { model, Schema, SchemaTypes } from 'mongoose';
import { User } from '../entites/user';

const userSchema = new Schema<User>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },

  // Este es opciona!
  fruits: [
    {
      type: SchemaTypes.ObjectId,
      ref: 'Fruit',
    },
  ],
});

userSchema.set('toJSON', {
  transform(_document, returnedObject) {
    returnedObject.id = returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject._id;
    delete returnedObject.password;
  },
});
export const UserModel = model('User', userSchema, 'users');
