import mysql from 'mysql2';



const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});


connection.connect((error) => {
  if (error) throw error;
  console.log('Successfully connected to the database.');
});

export const executeQuery = (queryText: string, values: any[]) => {
  return new Promise((resolve, reject) => {
    connection.query(queryText, values, (error, results, fields) => {
      if (error) reject(error);
      resolve(results);
    });
  });
}

export const mysqlEscape = connection.escape;
