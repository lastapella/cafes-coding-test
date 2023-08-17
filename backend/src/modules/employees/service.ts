
import { executeQuery } from '../../databases/mysql';
import { Employee } from './types'


const generateId = () => {
  const id = `UI${Math.random().toString(36).slice(2, 8)}`;
  return id
}

export const getById = async (id: string) => {
  try {
    const query = `SELECT * FROM employees WHERE id = ?`;
    const values = [id];
    const result = await executeQuery(query, values);
    return result as Employee.Full;
  } catch (err) {
    console.log(err);
    throw new Error('Error getting employee');
  }
}

export const getAll = async () => {
  try {
    const query = `SELECT * FROM employees`;
    const result = await executeQuery(query, []);
    return result as Employee.Full[];
  } catch (err) {
    console.log(err);
    throw new Error('Error getting employees');
  }
}
export const getByCafe = async (cafeId: string) => {
  try {
    const query = `
      SELECT * FROM employees 
      INNER JOIN cafe_employees ON employees.id = cafe_employees.employee_id 
      WHERE cafe_employees.cafe_id = ?`;
    const values = [cafeId];
    const result = await executeQuery(query, values);
    return result as Employee.Full[];
  } catch (err) {
    console.log(err);
    throw new Error('Error getting employees');
  }
}

export const create: (employeeData: Omit<Employee.Full, 'id'>) => Promise<Employee.Full> = async (employeeData) => {
  const id = generateId();
  const exist = await getById(id);
  if (exist) {
    return create(employeeData);
  } else {
    const query = `INSERT INTO employees (id, name, email_address, phone_number, gender) VALUES (?, ?, ?, ?, ?)`;
    const values = [id, employeeData.name, employeeData.email_address, employeeData.phone_number, employeeData.gender];
    try {
      await executeQuery(query, values);
      return getById(id);
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
