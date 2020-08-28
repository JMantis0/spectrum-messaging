DROP DATABASE IF EXISTS spectrum;

CREATE DATABASE spectrum;

USE spectrum;


CREATE TABLE messages (
	id int NOT NULL AUTO_INCREMENT,
  body VARCHAR(255) NOT NULL, 
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL,
  UserID INT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE users (
	id int NOT NULL AUTO_INCREMENT,
  email VARCHAR(255) NOT NULL, 
  password VARCHAR(255) NOT NULL, 
	usertype VARCHAR(255) NOT NULL, 
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL,
  UserID INT NOT NULL,
  PRIMARY KEY (id)
);
