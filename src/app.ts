import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { fruitRouter } from './routers/fruits.router.js';
import { CustomError } from './interfaces/interfaces.js';
import createDebug from 'debug';
import { usersRouter } from './routers/users.router.js';

export const app = express();
app.disable('x-powered-by');

const debug = createDebug('Fruits');
const corsOptions = {
  origin: '*',
};
app.use(morgan('dev'));
app.use(express.json());
app.use(cors(corsOptions));

app.use('/users', usersRouter);
app.use('/fruits', fruitRouter);

app.get('/', (_req, resp) => {
  resp.json({
    info: '/Esta es una prueba',
    endpoints: {
      things: '/fruits',
      users: '/users',
    },
  });
});

app.get('/:id', (req, resp) => {
  resp.send(req.params.id);
});
app.post('/', (req, resp) => {
  req.body.id = 12;
  resp.send(req.body);
});
app.patch('/:id');
app.delete('/:id');

app.use(
  (error: CustomError, _req: Request, resp: Response, _next: NextFunction) => {
    debug('Middleware de errores');
    const status = error.statusCode || 500;
    const statusMessage = error.statusMessage || 'Internal server error';
    resp.status(status);
    resp.json({
      error: [
        {
          status,
          statusMessage,
        },
      ],
    });
    debug(status, statusMessage, error.message);
  }
);
