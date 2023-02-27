import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { fruitRouter } from './routers/fruits.router.js';
export const app = express();
app.disable('x-powered-by');

const corsOptions = {
  origin: '*',
};
app.use(morgan('dev'));
app.use(express.json());
app.use(cors(corsOptions));

app.use('/fruits', fruitRouter);

app.get('/', (_req, res) => {
  res.send('Principal');
});
