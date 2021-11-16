const express = require('express');
require('dotenv').config({ path: '.env' });
const db = require('./db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
//const secrets = require('./secrets.json');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3000;



// Parses data from forms submitted by client
app.use(express.urlencoded({ extended: false}));
app.use(express.json());
app.use( express.static( path.join( __dirname, '..', 'client')));
app.use(cors())
// app.use(express.static(__dirname + '../client'));


const authRoute = require('./routes/auth');
app.use('/api/user', authRoute);
const projectRoute = require('./routes/project');
app.use('/api/project', projectRoute);

app.get('/', (req, res) => {
    res.sendFile( path.join( __dirname, '..', 'client', 'about_us.html' ));
});


// con.end((err) => {
//     // The connection is terminated gracefully
//     // Ensures all remaining queries are executed
//     // Then sends a quit packet to the MySQL server.
// });
app.listen(port, () => console.log(`Listening on port ${port}...`));
