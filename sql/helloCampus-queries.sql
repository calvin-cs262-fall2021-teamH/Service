--
-- This SQL script implements sample queries on the Hello Campus database.
--

-- Get the number of person records.
SELECT *
  FROM Person
  ;

-- Get the point of interest records.
SELECT * 
  FROM PointOfInterest
  ;

-- Get the question records.
SELECT * 
  FROM Question
  ;

-- Get the answer records.
SELECT * 
  FROM Answer
  ;

-- Get all the students with their student email address.
SELECT *
  FROM Person
  WHERE email LIKE '%students%'
  ;

-- Get all the professors with their Calvin email address.
SELECT *
  FROM Person
  WHERE email NOT LIKE '%students%'
  ;

-- Get all location point and its name, and the question at that location.
SELECT latitude, longitude, PointOfInterest.name, question 
  FROM PointOfInterest, Question
  WHERE pointID = PointOfInterest.ID
  ;

-- Get all everyone's name and their answer to the questions.
SELECT Person.name, question, answer
  FROM Person, Question, Answer
  WHERE Person.ID = personID 
  AND questionID = Question.ID
  ;

-- Get all student's name and their answer to the questions.
SELECT Person.name, question, answer
  FROM Person, Question, Answer
  WHERE Person.ID = personID 
  AND questionID = Question.ID
  AND email Like '%students%'
  ;
