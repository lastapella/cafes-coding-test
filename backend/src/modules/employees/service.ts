
import { executeQuery } from '../../databases/mysql';
import { Employee } from './types'


const generateId = () => {
  const id = `UI${Math.random().toString(36).slice(2, 8)}`;
  return id
}

export const getById = async (id: string) => {
  try {
    const query = `
      SELECT e.*, c.name as cafe_name, c.id as cafe_id 
      FROM employees e
      LEFT JOIN cafes_employees ce ON e.id = ce.employee_id LEFT JOIN cafes c ON ce.cafe_id = c.id
      WHERE e.id = ?`;
    const values = [id];
    const result = await executeQuery(query, values);
    return (result as (Employee.Full & { cafe_name: string, cafe_id: string })[])?.[0]
  } catch (err) {
    console.log(err);
    throw new Error('Error getting employee');
  }
}

export const getAll = async () => {
  try {
    const query = `
      SELECT e.* , c.name as cafe_name, c.id as cafe_id 
      FROM employees e 
      LEFT JOIN cafes_employees ce ON e.id = ce.employee_id 
      LEFT JOIN cafes c ON ce.cafe_id = c.id`;
    const result = await executeQuery(query, []);
    return result as (Employee.Full & { cafe_name: string, cafe_id: string })[];
  } catch (err) {
    console.log(err);
    throw new Error('Error getting employees');
  }
}
export const getByCafe = async (cafeId: string) => {
  try {
    const query = `
      SELECT * FROM employees 
      INNER JOIN cafes_employees ON employees.id = cafes_employees.employee_id 
      WHERE cafes_employees.cafe_id = ?`;
    const values = [cafeId];
    const result = await executeQuery(query, values);
    return result as Employee.Full[];
  } catch (err) {
    console.log(err);
    throw new Error('Error getting employees');
  }
}

export const create: (employeeData: Omit<Employee.Full, 'id'> & { cafe_id: string }) => Promise<Employee.Full> = async (employeeData) => {
  const id = generateId();
  const exist = await getById(id);
  if (exist) {
    return create(employeeData);
  } else {
    try {
      await executeQuery('START TRANSACTION', []);
      const query = `INSERT INTO employees (id, name, email_address, phone_number, gender) VALUES (?, ?, ?, ?, ?)`;
      const values = [id, employeeData.name, employeeData.email_address, employeeData.phone_number, employeeData.gender];
      await executeQuery(query, values);
      const query2 = `INSERT INTO cafes_employees (cafe_id, employee_id, joined_at) VALUES (?, ?, now())`;
      const values2 = [employeeData.cafe_id, id];
      await executeQuery(query2, values2);
      await executeQuery('COMMIT', []);
      const employee = await getById(id);
      return employee as Employee.Full;
    } catch (error) {
      console.log(error);
      throw new Error('Error creating employee');
    }
  }
}

export const update = async (employeeData: Employee.Full) => {
  const query = `UPDATE employees SET name, email_address, phone_number, gender WHERE id = ? `
  const values = [employeeData.name, employeeData.email_address, employeeData.phone_number, employeeData.gender, employeeData.id];
  try {
    await executeQuery(query, values);
  }
  catch (error) {
    console.log(error);
    throw new Error('Error updating employee');
  }

}

export const deleteById = async (id: string) => {
  try {
    const query = `DELETE FROM employees WHERE id = ?`;
    const values = [id];
    await executeQuery(query, values);
  } catch (error) {
    console.log(error);
    throw new Error('Error deleting employee');
  }
}
