DROP DATABASE IF EXISTS airplanes;
CREATE DATABASE airplanes;

\c airplanes;

CREATE TABLE aplanes (
  serial_number SERIAL PRIMARY KEY,
  name VARCHAR,
  model VARCHAR
);

INSERT INTO aplanes (name, model)
  VALUES ('Big John',  '787');