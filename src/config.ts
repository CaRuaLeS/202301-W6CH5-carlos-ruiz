import dotenv from 'dotenv';
dotenv.config();

export const config = {
  // Estos elementos son de mongoDB
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  cluster: process.env.DB_CLUSTER,
  dbName: process.env.DB_NAME,
  // Esto es para JWT
  jwtSecret: process.env.SECRET,
};
