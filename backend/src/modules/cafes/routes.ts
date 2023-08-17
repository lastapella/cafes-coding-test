import { Router, Request } from "express";

import { create, getAll, getByLocation, update, deleteById } from './service';
const router = Router();


router.get('/cafes', async (req: Request<any, any, any, { location?: string }>, res) => {
  const queryParam = req.query;

  let location = '';
  if (queryParam.location && queryParam.location.length > 0) {
    location = queryParam.location;
  }
  try {
    if (location.length > 0) {
      const result = await getByLocation(location);
      return res.status(200).json({ success: true, data: result });
    } else {
      const result = await getAll();
      return res.status(200).json({ success: true, data: result });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
})

router.post('/cafe', async (req, res) => {
  const body = req.body;
  //TODO
  const isValid = true;
  if (isValid) {
    try {
      const cafe = await create(body);
      return res.status(201).json({ success: true, data: cafe });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  } else {
    return res.status(400).json({ message: 'Invalid data' });
  }
})

router.put('/cafe', async (req, res) => {
  const body = req.body;
  const isValid = true;
  if (isValid) {
    try {
      await update(body);
      return res.status(200).json({ success: true });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  } else {
    return res.status(400).json({ message: 'Invalid data' });
  }
})

router.delete('/cafe', async (req: Request<any, any, any, { id: string }>, res) => {
  const cafeId = req.query.id;
  if (cafeId) {
    try {
      await deleteById(cafeId);
      return res.status(200).json({ success: true });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  } else {
    return res.status(400).json({ message: 'Invalid data' });
  }
})

export { router };
