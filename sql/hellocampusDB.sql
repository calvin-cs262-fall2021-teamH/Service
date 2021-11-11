--
-- This SQL script builds a Hello Campus database, deleting any pre-existing version.
--

-- Drop previous versions of the tables if they they exist, in reverse order of foreign keys.
DROP TABLE IF EXISTS Answer;
DROP TABLE IF EXISTS Question;
DROP TABLE IF EXISTS Person;
DROP TABLE IF EXISTS PointOfInterest;
go
use master 
go
Drop database if exists HelloCampus;
Create Database HelloCampus;
use HelloCampus
go

-- Create the schema.
CREATE TABLE Person (
    ID int identity PRIMARY KEY,
    email varchar(50),
	password varchar(250),
    name varchar(250)
    );

CREATE TABLE PointOfInterest (
    pointID int identity PRIMARY KEY,
    latitude float NOT NULL,
    longitude float NOT NULL,
    radius integer,
    name varchar(50),
    info varchar(1000),
    imageURL varchar(50)
    );

CREATE TABLE Question (
    questionID  int identity PRIMARY KEY,
    pointID integer REFERENCES PointOfInterest(pointID),
    question varchar (1000)
    );

CREATE TABLE Answer (
    personID integer REFERENCES Person(ID),
    questionID integer REFERENCES Question(questionID),
    answer varchar (1000)
    );

-- Allow users to select data from the tables.
GRANT SELECT ON Person TO PUBLIC;
GRANT SELECT ON PointOfInterest TO PUBLIC;
GRANT SELECT ON Question TO PUBLIC;
GRANT SELECT ON Answer TO PUBLIC;

-- Add sample records.
INSERT INTO Person(email) VALUES ('me@calvin.edu');
INSERT INTO Person(email, name) VALUES ('dch26@students.calvin.edu', 'David Heynen');
INSERT INTO Person(email, name) VALUES ('dog@students.calvin.edu', 'Dogbreath');
insert into person (email, password,name) Values ('psd23@students.calvin.edu','good night', 'paul');

INSERT INTO PointOfInterest(latitude, longitude, radius, name, info, imageURL)
VALUES (30.34, 50.20, 20, 'Whiskey Pond', 
        'This secluded pond is fed by a seep on the edge. It is home to ducks, frogs, and plants like Buttonbush, Duckweed, and the tiniest vascular plant in Michigan, water meal. Watch for the Great Blue Heron that often feeds here.',
        'WhiskeyPond.png');
INSERT INTO PointOfInterest(latitude, longitude, radius, name, info, imageURL)
VALUES (100.45, 235.01, 15, 'Crown Gap', 
        'In 1995, this large maple tree fell, removing branches from several neighboring trees. The result was a large hole in the canopy, or a crown gap. The gap allows more sunlight to reach the forest floor, encouraging growth of seedlings. Eventually one or two of the seedlings you see now will out-compete the others and will fill the canopy gap.',
        'CrownGap.png');

INSERT INTO Question(pointID, question) VALUES (1, 'What is something you learned about Whiskey Pond?');
INSERT INTO Question(pointID, question) VALUES (2, 'What is something you learned about Crown Gap?');

INSERT INTO Answer VALUES (2, 1, 'It is home to ducks, frogs, and plants.');
INSERT INTO Answer(personID, questionID) VALUES (1, 2);
INSERT INTO Answer VALUES (2, 2, 'In 1995, it fell and removed several neighboring trees.');
INSERT INTO Answer VALUES (3, 1, 'Great Blue Heron often feeds here.');
INSERT INTO Answer VALUES (3, 2, 'The gap allows more sunlight to reach the forest floor.');


select * from person
