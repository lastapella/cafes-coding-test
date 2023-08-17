import Express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

dotenv.config();

import { router as cafeRouter } from './modules/cafes/routes';
import { router as employeeRouter } from './modules/employees/routes';

const app = Express();

app.use(bodyParser.json());
app.get('/', (req, res) => {
  res.send('server is running');
})

app.use(cors());
app.use(cafeRouter);
app.use(employeeRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
})
