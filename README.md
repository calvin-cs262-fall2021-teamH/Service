# Service

Includes code and information for the dataservice hosted on Heroku.

Endpoints:

GET

https://hello-campus.herokuapp.com/

https://hello-campus.herokuapp.com/pointsofinterest/

https://hello-campus.herokuapp.com/questions/

https://hello-campus.herokuapp.com/questions/:id

https://hello-campus.herokuapp.com/questionsAtPoint/:pointId

https://hello-campus.herokuapp.com/answers/

https://hello-campus.herokuapp.com/answers/:questionId

https://hello-campus.herokuapp.com/answers/:personId/:questionId

https://hello-campus.herokuapp.com/answersForPerson/:personId

https://hello-campus.herokuapp.com/users/

https://hello-campus.herokuapp.com/userById/:id

https://hello-campus.herokuapp.com/usersByName/:name

https://hello-campus.herokuapp.com/usersByEmail/:email

https://hello-campus.herokuapp.com/allStudentUsers/

https://hello-campus.herokuapp.com/allProfessorUsers/

https://hello-campus.herokuapp.com/allGuestUsers/


PUT

https://hello-campus.herokuapp.com/updateAnswer/ - takes `personID`, `questionID`, `answer`; returns `personID` and `questionID` of updated answer


POST

https://hello-campus.herokuapp.com/answers/ - takes `personID`, `questionID`, `answer`

https://hello-campus.herokuapp.com/questions/ - takes `pointID`, `question`

https://hello-campus.herokuapp.com/users/ - takes `name`, `email`

https://hello-campus.herokuapp.com/pointsOfInterest/ - takes `latitude`, `longitude`, `radius`, `name`, `info`, `imageURL`


Example POST test with curl to create a user:
```
curl --header 'Content-Type: application/json' --data '{ "pointID": 1, "question": "Why are we here?" }' https://hello-campus.herokuapp.com/questions
```