const router = require('express').Router();
const db = require('../db');

router.post('/register', (req, res) => {
    console.log(req.body);
    res.send('Registered!');
});

router.post('/login', (req, res) => {
    console.log(req.body);
    res.send('Logged in!');
});

module.exports = router;