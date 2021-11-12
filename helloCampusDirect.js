// Set up the database connection.
const pgp = require('pg-promise')();
const db = pgp({
    host: process.env.DB_SERVER,
    port: process.env.DB_PORT,
    database: process.env.DB_USER,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    // For SSL, see: https://stackoverflow.com/questions/22301722/ssl-for-postgresql-connection-nodejs
    ssl: true,
});

// Send the SQL command directly to Postgres.
db.many("SELECT * FROM pointofinterest")
    .then(function (data) {
        console.log(data);
    })
    .catch(function (error) {
        console.log('ERROR:', error)
    });
