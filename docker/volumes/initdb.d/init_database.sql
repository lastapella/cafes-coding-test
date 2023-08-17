CREATE TABLE IF NOT EXISTS cafes (
  id VARCHAR(36) PRIMARY KEY ,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  logo TEXT NOT NULL,
  location TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS employes (
  id VARCHAR(10) PRIMARY KEY ,
  name TEXT NOT NULL,
  email_address TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  gender TEXT NOT NULL,
  cafe_id VARCHAR(36) NULL,
  FOREIGN KEY(cafe_id) REFERENCES cafes(id)
);

