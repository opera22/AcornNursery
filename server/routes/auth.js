const router = require('express').Router();
const db = require('../db');

router.post('/register', (req, res) => {
    console.log(req.body);
    db.query("insert into USERS values (NULL, ?, ?, ?, 0, now())", [req.body.username, req.body.f_name, req.body.l_name], (err, res) => {
        if (err) throw err;
        console.log("Insert ID: ", res.insertId);    
        res.status(201).send(`Successfully created user ${req.body.username}`);
    });
});

router.post('/login', (req, res) => {
    console.log(req.body);
    res.send("Success");
});

module.exports = router;