INSERT INTO Users (email, password, userName)
VALUES 
("Email1@test.com", "testPassword1", "testUserName1"),
("Email2@test.com", "testPassword2", "testUserName2");
INSERT INTO Messages (body, recipientId, senderId, createdAt)
VALUES 
("Hey whats up", 2, 1, "2020-08-29 23:20:06"),
("Not much", 1, 2, "2020-08-29 23:20:07"),
("Cool.  I am so tired wow", 2, 1, "2020-08-29 23:20:08"),
("Yea, me too.  I'm going to take a nap", 1, 2, "2020-08-29 23:20:09"),
("Omg no wai! me too!", 2, 1, "2020-08-29 23:20:10");
