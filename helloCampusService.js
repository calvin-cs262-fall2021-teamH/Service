// Set up the database connection.
const pgp = require('pg-promise')();
const db = pgp({
    host: process.env.DB_SERVER,
    port: process.env.DB_PORT,
    database: process.env.DB_USER,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

// Configure the server and its routes.

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const router = express.Router();
router.use(express.json());

router.get("/", readHelloMessage);
router.get("/pointsOfInterest", readPointsOfInterest);
router.delete("/pointOfInterest", deletePointOfInterest);

router.get("/questions", readQuestions);
router.get("/questions/:id", readQuestion);
router.get("/questionsAtPoint/:pointId", readQuestionsAtPoint);
router.post("/questions", createQuestion);
router.delete("/questions/:id", deleteQuestion);

router.get("/answers", readAnswers);
router.get("/answers/:questionId", readAnswersForQuestion);
router.get("/answers/:personId/:questionId", readPersonsAnswersForQuestion);
router.get("/answersForPerson/:personId", readPersonsAnswers);
router.post("/answers", createAnswer);

router.get("/users", getUsers);
router.get("/userById/:id", getUserForId);
router.get("/usersByName/:name", getUserForName);
router.get("/usersByEmail/:email", getUserForEmail);
router.post("/users", createUser);

router.get("/allStudentUsers", getStudentUsers);
router.get("/allProfessorUsers", getProfessorUsers);
router.get("/allGuestUsers", getGuestUsers);

app.use(router);
app.use(errorHandler);
app.listen(port, () => console.log(`Listening on port ${port}`));

// Implement the CRUD operations.

function errorHandler(err, req, res) {
    if (app.get('env') === "development") {
        console.log(err);
    }
    res.sendStatus(err.status || 500);
}

function returnDataOr404(res, data) {
    if (data == null) {
        res.sendStatus(404);
    } else {
        res.send(data);
    }
}

function readHelloMessage(req, res) {
    res.send('Hello, Hello Campus service!');
}

function readPointsOfInterest(req, res, next) {
    db.many("SELECT * FROM PointOfInterest")
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            next(err);
        })
}

function readQuestions(req, res, next) {
    db.many("SELECT * FROM Question")
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            next(err);
        });
}

function readQuestion(req, res, next) {
    db.oneOrNone(
"SELECT pointID, question FROM Question WHERE ID = ${id}", req.params)
        .then(data => {
            returnDataOr404(res, data);
        })
        .catch(err => {
            next(err);
        })
}

function readQuestionsAtPoint(req, res, next) {
    db.manyOrNone(
"SELECT * FROM Question WHERE Question.pointID = ${pointId}", req.params)
        .then(data => {
            returnDataOr404(res, data);
        })
        .catch(err => {
            next(err);
        })
}

function readAnswers(req, res, next) {
    db.manyOrNone("SELECT * FROM Answer")
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            next(err);
        })
}

function readAnswersForQuestion(req, res, next) {
    db.manyOrNone(
"SELECT personID, answer FROM answer WHERE questionID = ${questionId}", req.params)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            next(err);
        })
}

function readPersonsAnswersForQuestion(req, res, next) {
    db.manyOrNone(
"SELECT answer FROM Answer WHERE personID = ${personId} AND questionID = ${questionId}", req.params)
        .then(data => {
            returnDataOr404(res, data);
        })
        .catch(err => {
            next(err);
        })
}

function readPersonsAnswers(req, res, next) {
    db.manyOrNone(
"SELECT questionID, answer FROM Answer WHERE personID = ${personId}", req.params)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            next(err);
        })
}

function createAnswer(req, res, next) {
    db.one(
"INSERT INTO Answer(personID, questionID, answer) " +
"VALUES(" +
"(SELECT Person.ID FROM Person WHERE Person.email = ${email}), " +
"${questionID}, " + 
"${answer}) " +
"RETURNING Answer.questionID;" , req.body)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            next(err);
        });
}

function getUsers(req, res, next) {
    db.manyOrNone("SELECT * FROM Person")
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            next(err);
        });
}

function getUserForId(req, res, next) {
    db.oneOrNone(
"SELECT * FROM Person WHERE id = ${id}", req.params)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            next(err);
        }); 
}

function getUserForName(req, res, next) {
    db.manyOrNone(
"SELECT * FROM Person WHERE name = ${name}", req.params)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            next(err);
        });
}

function getUserForEmail(req, res, next) {
    db.oneOrNone(
"SELECT * FROM Person WHERE email = ${email}", req.params)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            next(err);
        });
}

function createUser(req, res, next) {
    db.one(
"INSERT INTO Person(email, name) VALUES (${email}, ${name}) RETURNING id", req.body)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            next(err);
        });
}

function createQuestion(req, res, next) {
    db.one(
"INSERT INTO Question(pointID, question) VALUES (${pointID}, ${question}) RETURNING pointID", req.body)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            next(err);
        });
}

function deleteQuestion(req, res, next) {
    db.one(
"DELETE FROM Question WHERE ID = ${id}", req.params)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            next(err);
        });
}

function deletePointOfInterest(req, res, next) {
    db.one(
"DELETE FROM PointOfInterest WHERE ID = ${id}", req.params)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            next(err);
        });
}

function getStudentUsers(req, res, next) {
    db.manyOrNone(
"SELECT * FROM Person WHERE isStudent")
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            next(err);
        });
}

function getProfessorUsers(req, res, next) {
    db.manyOrNone(
"SELECT * FROM Person WHERE isProfessor")
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            next(err);
        });
}

function getGuestUsers(req, res, next) {
    db.manyOrNone(
"SELECT * FROM Person WHERE NOT isStudent and NOT isProfessor")
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            next(err);
        });
}
