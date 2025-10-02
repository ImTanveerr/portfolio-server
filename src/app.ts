import express from 'express';
import { type Express } from 'express';
import { globalErrorHandler } from './middleware/error.middleware';
import { notFound } from './middleware/notfound.middleware';
import { globalRouter } from './router';
import cors from 'cors';

export const app: Express = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('App is running succesfully!'));
app.use('/api', globalRouter);

app.use(globalErrorHandler);
app.use(notFound);
