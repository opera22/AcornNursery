const db = require('mysql');

console.log(process.env.DB_HOST,
    process.env.DB_PORT,
    process.env.DB,
    process.env.DB_USER,
    process.env.DB_PASS);

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

module.exports = con;