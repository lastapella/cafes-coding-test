import Express from 'express';
import dotenv from 'dotenv';

dotenv.config();

import { router as cafeRouter } from './modules/cafes/routes';
import { router as employeeRouter } from './modules/employees/routes';

const app = Express();

app.get('/', (req, res) => {
  res.send('Hello World');
})

app.use(cafeRouter);
app.use(employeeRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
})
