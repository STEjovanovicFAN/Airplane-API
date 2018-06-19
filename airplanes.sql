DROP DATABASE IF EXISTS airplanes;
CREATE DATABASE airplanes;

\c airplanes;

CREATE TABLE aplanes (
  ID SERIAL PRIMARY KEY,
  name VARCHAR,
  model VARCHAR,
  serial_number INTEGER
);

INSERT INTO aplanes (name, model, serial_number)
  VALUES ('Big John',  '787', 12377231);