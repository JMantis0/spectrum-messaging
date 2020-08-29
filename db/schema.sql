DROP DATABASE IF EXISTS spectrum;

CREATE DATABASE spectrum;

USE spectrum;


CREATE TABLE messages (
	id int NOT NULL AUTO_INCREMENT,
  body VARCHAR(9999) NOT NULL, 
  createdAt TIMESTAMP NOT NULL,
  updatedAt TIMESTAMP NOT NULL,
  recipient VARCHAR(9999) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE users (
	id int NOT NULL AUTO_INCREMENT,
  email VARCHAR(255) NOT NULL, 
  password VARCHAR(255) NOT NULL, 
	userName VARCHAR(255) NOT NULL, 
  createdAt TIMESTAMP NOT NULL,
  updatedAt TIMESTAMP NOT NULL,
  PRIMARY KEY (id)
);
