const router = require('express').Router();
const { response } = require('express');
const db = require('../db');

router.post('/create', (req, res) => {

    let project_id = null;
    // Matching category names from client to category names in DB
    let category = "";
    switch (req.body.Catagory) {
        case "web":
            category = "Web";
            break;
    }
    
    // Queries are nested because they are asynchronous and rely on each other (second query requires project_id from insert statement in first query)
    db.query("insert into PROJECTS values (NULL, 1, ?, ?, 0, now(), ?)", [req.body.Title, req.body.Description, category], (err, res) => {
        if (err) {
            console.log(err);
            return;
        }

        console.log("Insert ID for PROJECTS: ", res.insertId);
        // This value needs to be used in the next query
        project_id = res.insertId;

        // The features are stored in JSON, not a list. This next line console-logs the keys and converts them to a list.
        console.log(Object.keys(req.body.features));
        let features_list = [];
        Object.keys(req.body.features).forEach(feature => {
            features_list.push(feature)
        });

        features_list.forEach(feature => {
            db.query("insert into FEATURES values (NULL, ?, ?, ?)", [project_id, feature, req.body.features[feature]], (err, res) => {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log("Insert ID for feature: ", res.insertId);   
            });
        });
    });

    res.status(201).send(`Successfully created project ${req.body.Title}`);
});

router.get('/getall?:id', (req, res) => {

    let responseRows = [];

    console.log(req.body);
    db.query('select * from projects', (err, rows) => {

        if (err) {
            console.log(err);
            return;
        }
        // console.log(rows);

        rows.forEach(row => {
            responseRows.push({
                "title": row.PROJECT_TITLE,
                "description": row.PROJECT_DESC,
                "date": row.PROJECT_CREATED_DATE,
                "category": "Unknown",
                "features": []
            });
        });

        res.send(responseRows); 
    });
    // res.send([{
    //     "title": "my title!",
    //     "description": "desc",
    //     "date": "jan 7",
    //     "category": "web???"
    // }]);
    // console.log(responseRows);
});

module.exports = router;