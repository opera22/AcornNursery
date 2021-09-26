const express = require('express');
const db = require('mysql');
require('dotenv').config();
const secrets = require('./secrets.json');

const app = express();
const port = 3000;

// console.log(process.env.DB_HOST,
//     process.env.DB_PORT,
//     process.env.DB,
//     process.env.DB_USER,
//     process.env.DB_PASS);

const con = db.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB,
    user: process.env.DB_USER,
    password: process.env.DB_PASS
})

con.connect((err) => {
    err ? console.log(err) : console.log("Connected to MySQL instance");
});

// con.query('use test', (err, result) => {
//     if(err) console.log(err);
// });

const authRoute = require('./routes/auth');
app.use('/api/user', authRoute);

app.get('/', (req, res) => {
    con.query('select * from test_table', (err, rows) => {
        if(err) console.log(err);
        console.log(rows);
        res.json({
            id: rows[0].id,
            name: rows[0].name
        });
        // res.send(`Here's your first response... \n id: ${rows[0].id} \n name: ${rows[0].name}`);
    });
});


// con.end((err) => {
//     // The connection is terminated gracefully
//     // Ensures all remaining queries are executed
//     // Then sends a quit packet to the MySQL server.
// });
app.listen(port, () => console.log(`Listening on port ${port}...`));
