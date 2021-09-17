const express = require('express');
const db = require('mysql');
const secrets = require('./secrets.json');

const app = express();
const port = 3000;

const con = db.createConnection({
    host: secrets.dbhost,
    port: secrets.dbport,
    user: secrets.dbuser,
    password: secrets.dbpass
})

con.connect((err) => {
    if(err) console.log(err);
});

con.query('use test', (err, result) => {
    if(err) console.log(err);
});

app.get('/', (req, res) => {
    con.query('select * from test_table', (err, rows) => {
        if(err) console.log(err);
        console.log(rows);
        res.send(`Here's your first response... \n id: ${rows[0].id} \n name: ${rows[0].name}`);
    });
});


// con.end((err) => {
//     // The connection is terminated gracefully
//     // Ensures all remaining queries are executed
//     // Then sends a quit packet to the MySQL server.
// });
app.listen(port, () => console.log(`Listening on port ${port}...`));
