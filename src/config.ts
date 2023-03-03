import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
dotenv.config();

export const config = {
  // Estos elementos son de mongoDB
  user: process.env.DB_USER,
  password: encodeURIComponent(process.env.DB_PASSWORD as string),
  cluster: process.env.DB_CLUSTER,
  dbName: process.env.DB_NAME,
  // Esto es para JWT
  jwtSecret: process.env.SECRET,
};

export const __dirname = path.dirname(fileURLToPath(import.meta.url));
