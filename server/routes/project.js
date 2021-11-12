const router = require('express').Router();
const db = require('../db');

router.post('/create', (req, res) => {

    let project_id = null;

    console.log(req.body);

    try {
        // Queries are nested because they are asynchronous and rely on each other (second query requires project_id from insert statement in first query)
        db.query("insert into PROJECTS values (NULL, 1, ?, ?, 0, now())", [req.body.Title, req.body.Description], (err, res) => {
            console.log("Insert ID for PROJECTS: ", res.insertId);
            // This value needs to be used in the next query
            project_id = res.insertId;
    
            // Matching category names from client to category names in DB
            let category = "";
            switch (req.body.Catagory) {
                case "web":
                    category = "Web";
                    break;
            }
    
            db.query("insert into PROJECTS_CATEGORIES select NULL, ?, c.CATEGORY_ID from PROJECTS p cross join CATEGORIES c where c.CATEGORY_NAME = ?", [project_id, category], (err, res) => {
                console.log("Insert ID for PROJECTS_CATEGORIES: ", res.insertId); 

                
            });
        });
    } catch (err) {
        console.log(err);
    }
    res.status(201).send(`Successfully created project ${req.body.Title}`);
});

router.post('/getall?:id', (req, res) => {
    console.log(req.body);
    // db.query('select * from test_table', (err, rows) => {
    //     if(err) console.log(err);
    //     console.log(rows);
    //     res.json({
    //         title: rows[0].id,
    //         description: rows[0].name
    //     });
    // });
    res.send("hi");
});

module.exports = router;