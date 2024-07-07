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
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config({ path: './.env.development' });

const app = express();
const PORT = 8000;

app.use(cors());

app.use(express.json());
app.use(urlencoded({ extended: true }));

app.use(
  '/api/auth',
  (req: Request, res: Response, next: NextFunction) => next(),
  authRouter,
);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
