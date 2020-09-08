INSERT INTO Users (email)
VALUES 
("Email1@test.com"),
("Email2@test.com"),
("Email3@test.com"),
("Email4@test.com"),
("Email5@test.com"),
("Email6@test.com");

INSERT INTO Messages (body, recipientId, senderId, createdAt)
VALUES 
("Hey whats up", "Email2@test.com", "Email1@test.com", "2020-08-29 23:20:06"),
("Not much", "Email1@test.com", "Email2@test.com", "2020-08-29 23:20:07"),
("Cool.  I am so tired wow", "Email2@test.com", "Email1@test.com", "2020-08-29 23:20:08"),
("Yea, me too.  I'm going to take a nap", "Email1@test.com", "Email2@test.com", "2020-08-29 23:20:09"),
("Omg no wai! me too!", "Email2@test.com", "Email1@test.com", "2020-08-29 23:20:10"),
("I think you're cool", "Email3@test.com", "Email1@test.com", "2020-08-29 23:20:10"),
("Omg, I think you're cool, too!!!!!", "Email1@test.com", "Email3@test.com", "2020-08-29 23:20:10");
