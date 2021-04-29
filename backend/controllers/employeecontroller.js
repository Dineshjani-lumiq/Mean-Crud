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

router.delete('/:id', (req, res) => {
    console.log(req.params.id);
    console.log(typeof(req.params.id));
    
    student.find({phonenumber:req.params.id},function(err,ans){
      
      if(ans.length==0||err){
        res.status(201).json({
          message: 'Not Present in Database'
        });
      } 
      else{
    student.deleteMany({phonenumber:req.params.id},function(err){
      if(err){
        res.status(201).json({
          message: 'error in deleting this id !'
        });}
        else{
        
          res.status(201).json({
            message: 'deleted successfully!'
          });
        }
    
    })
  }
  })
   
});


router.put('/', (req, res) => {
  console.log(typeof(req.body.phonenumber));
  var a=parseInt(req.body.phonenumber);
student.updateMany({ phonenumber: a },{$set:{name:req.body.name}},function(err){
          if(err){
            res.status(201).json({
              message: 'error in updating this id !'
            });}
            else{
              res.status(201).json({
                message: 'updated successfully!'
              });
            }
        
        })
})


module.exports = router;