const router = require('express').Router();
const { response } = require('express');
const db = require('../db');

function sleep(ms) {
    var start = new Date().getTime(),
      expire = start + ms;
    while (new Date().getTime() < expire) {}
    return;
  }

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

var responseRows = [];
router.get('/getall', (req, res) => {


    db.query('select * from projects', (err, rows) => {

        if (err) {
            console.log(err);
            return;
        }
        // console.log(rows);

        rows.forEach(row => {

            // Empty the features list (it will be different for each project/row)
            features_list = [];

            db.query('select * from features where project_id = ? order by project_id desc', [row.PROJECT_ID], (err, res2) => {
                if (err) {
                    console.log(err);
                    return;
                }
                // If the project ID is the placeholder row, return the response; the projects list is complete
                if (row.PROJECT_ID === 0) {
                    res.send(responseRows);
                    return;
                }
                // console.log("LOOK HERE", res);
                features_list = res2.map(item => {
                    // console.log("LOOK HERE", item.FEATURE_NAME);
                    return {"FEATURE_NAME": item.FEATURE_NAME, "FEATURE_DESC": item.FEATURE_DESC};
                });

                // console.log(res);
                responseRows.push({
                    "title": row.PROJECT_TITLE,
                    "description": row.PROJECT_DESC,
                    "date": row.PROJECT_CREATED_DATE,
                    "category": row.CATEGORY,
                    "features": features_list
                });

                // console.log("LOOK HERE", responseRows);
            });     
        });

        // sleep(2000);
        // console.log(responseRows);
        // res.send(responseRows); 
        
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