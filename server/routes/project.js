const router = require('express').Router();
const db = require('../db');

router.post('/create', (req, res) => {
    console.log(req.body);
    res.send('Created project!');
});

router.get('/getall', (req, res) => {
    db.query('select * from test_table', (err, rows) => {
        if(err) console.log(err);
        console.log(rows);
        res.json({
            id: rows[0].id,
            name: rows[0].name
        });
        // res.send(`Here's your first response... \n id: ${rows[0].id} \n name: ${rows[0].name}`);
    });
});

module.exports = router;