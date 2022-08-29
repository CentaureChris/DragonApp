import express, { Express, Request, Response } from 'express';

// const dotenv = require('dotenv');
// dotenv.config();

const app: Express = express();
const port = 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Dragon combat');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});


