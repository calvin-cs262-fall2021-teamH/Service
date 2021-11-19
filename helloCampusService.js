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
router.get("/pointsofinterest", readPointsOfInterest);

router.get("/questions", readQuestions);
router.get("/questions/:id", readQuestion);
router.get("/questionsatpoint/:pointid", readQuestionsAtPoint);

// router.get("/answers", readAnswers);
// router.get("/answers/:questionid", readAnswersForQuestion);
// router.get("/answers/:questionid/:personid", readPersonsAnswersForQuestion);
// router.get("/answersforperson/:personid", readPersonsAnswers);

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
    db.many("SELECT * FROM pointofinterest")
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            next(err);
        })
}

function readQuestions(req, res, next) {
    db.many("SELECT * FROM question")
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            next(err);
        });
}

function readQuestion(req, res, next) {
    db.oneOrNone(
"SELECT * FROM question WHERE question.id = ${id}", req.params)
        .then(data => {
            returnDataOr404(res, data);
        })
        .catch(err => {
            next(err);
        })
}

function readQuestionsAtPoint(req, res, next) {
    db.manyOrNone(
"SELECT * FROM question WHERE question.pointid = ${pointid}", req.params)
        .then(data => {
            returnDataOr404(res, data);
        })
        .catch(err => {
            next(err);
        })
}