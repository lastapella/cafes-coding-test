CREATE TABLE IF NOT EXISTS cafes (
  id VARCHAR(36) PRIMARY KEY ,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  logo TEXT NOT NULL,
  location TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS employees (
  id VARCHAR(10) PRIMARY KEY,
  name TEXT NOT NULL,
  email_address TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  gender TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS cafes_employees (
  cafe_id VARCHAR(36) NOT NULL,
  employee_id VARCHAR(10) NOT NULL,
  joined_at DATETIME NOT NULL,
  left_at DATETIME,
  PRIMARY KEY (cafe_id, employee_id),
  FOREIGN KEY (cafe_id) REFERENCES cafes(id),
  FOREIGN KEY (employee_id) REFERENCES employees(id)
);
