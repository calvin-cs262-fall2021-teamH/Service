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

router.get("/questions", readQuestions);
router.get("/questions/:id", readQuestion);
router.get("/questionsAtPoint/:pointId", readQuestionsAtPoint);

router.get("/answers", readAnswers);
router.get("/answers/:questionId", readAnswersForQuestion);
router.get("/answers/:personId/:questionId", readPersonsAnswersForQuestion);
router.get("/answersForPerson/:personId", readPersonsAnswers);
router.post("/answers", createAnswer);

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
"INSERT INTO Answer(personID, questionID, answer) VALUES (${personID}, ${questionID}, ${answer}) RETURNING questionID", req.body)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            next(err);
        });
}
