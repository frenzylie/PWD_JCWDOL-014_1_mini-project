import express, { Request, Response, NextFunction } from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import authRouter from './routers/auth.router';  
import eventsRouter from './routers/events'; 


config({ path: './.env.development' });

const app = express();

app.use(cors());


app.use(express.json());


app.use('/api/auth', authRouter);


app.use('/api/events', eventsRouter);


app.use('*', (req: Request, res: Response) => {
  res.status(404).json({ message: 'Not Found' });
});


app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong' });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
