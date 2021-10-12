const router = require('express').Router();

router.post('/register', (req, res) => {
    console.log(req.body);
    res.send('Registered!');
});

module.exports = router;