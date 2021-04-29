const express = require('express');
var router = express.Router();


var { student } = require('../models/model');

// => localhost:3000/employees/
router.get('/', (req, res) => {
    student.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving Employees :'); }
    });
});


router.post('/', (req, res) => {
    console.log(req.body.name);
    console.log("from server");
    var stu = new student({
        name: req.body.name,
        phonenumber:req.body.phonenumber,
        dateofbirth:req.body.dateofbirth,
        gender:req.body.gender,
        address:req.body.address,
        marks:req.body.marks

    });
    stu.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Employee Save :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.put('/:id', (req, res) => {
   
});



module.exports = router;