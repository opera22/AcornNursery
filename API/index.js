const express = require('express');
const app = express();
const port = 3000;


app.get('/', (req, res) => {
    res.send("Here's your first response!");
});

app.listen(port, () => console.log(`Listening on port ${port}...`));
