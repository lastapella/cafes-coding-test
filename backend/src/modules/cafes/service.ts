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
    const result = await executeQuery(`SELECT * FROM cafes`, []);
    return result as Cafe.Full[];
  } catch (err) {
    console.log(err)
    throw new Error('Error getting cafes')
  }
}
export const getByLocation = async (location: string) => {
  try {
    const result = await executeQuery(`SELECT * FROM cafes WHERE location = ?`, [location]);
    return result as Cafe.Full[];
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
    await executeQuery(`
      DELETE FROM employees
      INNER JOIN cafe_employees ON employees.id = cafe_employees.employee_id 
      WHERE cafe_employees.cafe_id = ?`, [id]);
    await executeQuery(`DELETE FROM cafes WHERE id = ?`, [id]);
  } catch (err) {
    console.log(err)
    throw new Error('Error deleting cafe')
  }
}
