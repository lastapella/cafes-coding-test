import { Router, Request } from "express";

import { getAll, getByCafe, create, update, deleteById } from './service';

const router = Router();


router.get('/employees', async (req: Request<any, any, any, { cafe?: string }>, res) => {
  const queryParam = req.query;

  let cafe = '';
  if (queryParam.cafe && queryParam.cafe.length > 0) {
    cafe = queryParam.cafe;
  }
  try {
    if (cafe.length > 0) {
      const result = await getByCafe(cafe);
      return res.status(200).json({ success: true, data: result });
    } else {
      const result = await getAll();
      return res.status(200).json({ success: true, data: result });
    }
  }
  catch (error) {
    return res.status(500).json({ message: error.message });
  }
})

router.post('/employee', async (req, res) => {
  const body = req.body;
  // TODO
  const isValid = true;
  if (isValid) {
    try {
      const employee = await create(body);
      return res.status(201).json({ success: true, data: employee });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  } else {
    return res.status(400).send('Invalid data');
  }
})

router.put('/employee', async (req, res) => {
  const body = req.body;
  // TODO
  const isValid = true;
  if (isValid) {
    try {
      await update(body);
      return res.status(200).json({ success: true });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  } else {
    return res.status(400).send('Invalid data');
  }
})

router.delete('/employee', async (req: Request<any, any, any, { id: string }>, res) => {
  const employeeId = req.query.id;
  try {
    await deleteById(employeeId);
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

})

export { router }


