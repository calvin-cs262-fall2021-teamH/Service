--
-- This SQL script builds a Hello Campus database, deleting any pre-existing version.
--

-- Drop previous versions of the tables if they they exist, in reverse order of foreign keys.
DROP TABLE IF EXISTS Answer;
DROP TABLE IF EXISTS Question;
DROP TABLE IF EXISTS Person;
DROP TABLE IF EXISTS PointOfInterest;

-- Create the schema.
CREATE TABLE Person (
    ID SERIAL PRIMARY KEY,
    email varchar(50),
    name varchar(50)
    );

CREATE TABLE PointOfInterest (
    ID SERIAL PRIMARY KEY,
    latitude float NOT NULL,
    longitude float NOT NULL,
    radius integer,
    name varchar(50),
    info varchar(1000),
    imageURL varchar(300)
    );

CREATE TABLE Question (
    ID SERIAL PRIMARY KEY,
    pointID integer REFERENCES PointOfInterest(ID),
    question varchar (1000)
    );

CREATE TABLE Answer (
    personID integer REFERENCES Person(ID),
    questionID integer REFERENCES Question(ID),
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

INSERT INTO PointOfInterest(latitude, longitude, radius, name, info, imageURL)
VALUES (42.932583143988886,
        -85.58309647938191,
        15,
        'Whiskey Pond',
        'This secluded pond is fed by a seep on the edge. It is home to ducks, frogs, and plants like Buttonbush, Duckweed, and the tiniest vascular plant in Michigan, water meal. Watch for the Great Blue Heron that often feeds here.',
        'https://raw.githubusercontent.com/calvin-cs262-fall2021-teamH/Service/main/point_assets/WhiskeyPond.png');
INSERT INTO PointOfInterest(latitude, longitude, radius, name, info, imageURL)
VALUES (42.93374267151409,
        -85.58030280488913,
        15,
        'Crown Gap',
        'In 1995, this large maple tree fell, removing branches from several neighboring trees. The result was a large hole in the canopy, or a crown gap. The gap allows more sunlight to reach the forest floor, encouraging growth of seedlings. Eventually one or two of the seedlings you see now will out-compete the others and will fill the canopy gap.',
        'https://raw.githubusercontent.com/calvin-cs262-fall2021-teamH/Service/main/point_assets/CrownGap.png');

INSERT INTO Question(pointID, question) VALUES (1, 'What are some primary producers in this area?');
INSERT INTO Question(pointID, question) VALUES (1, 'What are some primary consumers in this area? If you see none, what might you expect to see?');
INSERT INTO Question(pointID, question) VALUES (1, 'What are some secondary consumers in this area? If you see none, what might you expect to see?');
INSERT INTO Question(pointID, question) VALUES (2, 'What is something you learned about Crown Gap?');
INSERT INTO Question(PointID, question) VALUES (3, 'What is something you learned about this location?');
INSERT INTO Question(PointID, question) VALUES (3, 'What is a crazy fact about this area?');
INSERT INTO Question(PointID, question) VALUES (3, 'Any more observations?');

INSERT INTO Answer VALUES (2, 1, 'It is home to ducks, frogs, and plants.');
INSERT INTO Answer(personID, questionID) VALUES (1, 2);
INSERT INTO Answer VALUES (2, 2, 'In 1995, it fell and removed several neighboring trees.');
INSERT INTO Answer VALUES (3, 1, 'Great Blue Heron often feeds here.');
INSERT INTO Answer VALUES (3, 2, 'The gap allows more sunlight to reach the forest floor.');
