DROP DATABASE IF EXISTS airplanes;
CREATE DATABASE airplanes;

\c airplanes;

CREATE TABLE aplanes (
  name VARCHAR,
  serial_number INTEGER,
  model VARCHAR
);

INSERT INTO aplanes (name, serial_number, model)
  VALUES ('Big John', 1123412314, '787');