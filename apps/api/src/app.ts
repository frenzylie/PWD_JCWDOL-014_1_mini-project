import express, {
  json,
  urlencoded,
  Express,
  Request,
  Response,
  NextFunction,
  Router,
} from 'express';
import authRouter from './routers/auth.router';
import transactionRouter from './routers/transaction.router';
import dotenv from 'dotenv';
import cors from 'cors';
import eventsRouter from './routers/events'; 


dotenv.config({ path: './.env.development' });

const app = express();
const PORT = process.env.PORT;

app.use(cors());

app.use(express.json());
app.use(urlencoded({ extended: true }));

app.use(
  '/api/auth',
  (req: Request, res: Response, next: NextFunction) => next(),
  authRouter,
);
app.use('/api/transaction', transactionRouter);

app.use('/api/events', eventsRouter);

app.use('*', (req: Request, res: Response) => {
  res.status(404).json({ message: 'Not Found' });
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});