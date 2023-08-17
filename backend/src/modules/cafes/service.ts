import { executeQuery } from '../../databases/mysql';
import { Cafe } from './types'
import { v4 as uuidv4 } from 'uuid';


const generateId = () => {
  return uuidv4();
}

export const getById = async (id: string) => {
  try {
    const result = await executeQuery(`SELECT * FROM cafes WHERE id = ?`, [id]);
    return result as Cafe.Full;
  } catch (err) {
    console.log(err);
    throw new Error('Error getting cafe');
  }
}

export const getAll = async () => {
  try {
    const result = await executeQuery(`
      SELECT c.id, c.name, c.description, c.logo, c.location, count(cafes_employees.employee_id) as employee_count 
      FROM cafes c
      LEFT JOIN cafes_employees ON c.id = cafes_employees.cafe_id 
      GROUP BY c.id
`, []);
    return result as (Cafe.Full & { employee_count: number })[];
  } catch (err) {
    console.log(err)
    throw new Error('Error getting cafes')
  }
}
export const getByLocation = async (location: string) => {
  try {
    const result = await executeQuery(`
      SELECT c.id, c.name, c.description, c.logo, c.location, count(cafes_employees.employee_id) as employee_count 
      FROM cafes c
      WHERE c.location = ?
      LEFT JOIN cafes_employees ON c.id = cafes_employees.cafe_id 
      GROUP BY c.id
`, [location]);
    return result as (Cafe.Full & { employee_count: number })[]
  } catch (err) {
    console.log(err)
    throw new Error('Error getting cafes')
  }
}

export const create = async (cafe: Omit<Cafe.Full, 'id'>) => {
  const id = generateId();
  try {
    const result = await executeQuery(`INSERT INTO cafes (id, name, description, location, logo) VALUES (?, ?, ?, ?, ?)`, [id, cafe.name, cafe.description, cafe.location, cafe.logo]);
    return result as Cafe.Full;
  } catch (err) {
    console.log(err)
    throw new Error('Error creating cafe')
  }
}

export const update = async (cafe: Cafe.Full) => {
  try {
    const result = await executeQuery(`UPDATE cafes SET name = ?, description = ?, location = ?, logo = ? WHERE id = ?`, [cafe.name, cafe.description, cafe.location, cafe.logo, cafe.id]);
    return result;
  } catch (err) {
    console.log(err)
    throw new Error('Error updating cafe')
  }
}

export const deleteById = async (id: string) => {
  try {
    await executeQuery(`SET FOREIGN_KEY_CHECKS=0;`, []);
    await executeQuery(`
      DELETE e , c, ce  FROM cafes c
      INNER JOIN cafes_employees ce ON c.id = ce.cafe_id 
      INNER JOIN employees e ON ce.employee_id = e.id
      WHERE ce.cafe_id = ?`, [id]);
    await executeQuery(`SET FOREIGN_KEY_CHECKS=1;`, []);
  } catch (err) {
    console.log(err)
    throw new Error('Error deleting cafe')
  }
}
