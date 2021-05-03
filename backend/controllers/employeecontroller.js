const express = require('express');
var router = express.Router();


var { student } = require('../models/model');

// => localhost:3000/employees/
/*
router.get('/', (req, res) => {
    student.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { res.send(err); }
    });
});

*/
router.get('/', async (req, res) => {
  try{

   const docs= await student.find({});
   res.send(docs);
  }
   catch(err){
res.send(err);
   }
       
 
});
router.get('/:id', async (req, res) => {
  try{

   const docs= await student.find({phonenumber: req.params.id });
   console.log(docs);
   res.send(docs);
  }
   catch(err){
res.send(err);
   }
       
 
});
router.post('/', (req, res) => {
  console.log(req.body.name);
  console.log("from server");
  var stu = new student({
    name: req.body.name,
    phonenumber: req.body.phonenumber,
    dateofbirth: req.body.dateofbirth,
    gender: req.body.gender,
    address: req.body.address,
    marks: req.body.marks

  });
  stu.save((err, doc) => {
    if (!err) { res.send(doc); }
    else { res.send(err); }
  });
});
/*
router.delete('/:id', (req, res) => {
  console.log(req.params.id);
  console.log(typeof (req.params.id));

  student.find({ phonenumber: req.params.id }, function (err, ans) {

    if (ans.length == 0 || err) {
      res.status(201).json({
        message: 'this phonenumber is Not Present in Database'
      });
    }
    else {
      student.deleteMany({ phonenumber: req.params.id }, function (err) {
        if (err) {
          res.status(201).json({
            message: 'error in deleting this id !'
          });
        }
        else {

          res.status(201).json({
            message: 'deleted successfully!'
          });
        }

      })
    }
  })

});
*/

router.delete('/:id', async (req, res) => {
 try{
   console.log(req.params.id);
   const ans= await student.find({phonenumber: req.params.id });
  if(ans.length==0){
    res.status(201).json({
        message: 'this phonenumber is Not Present in Database'
      });
  }
    else{
      console.log(req.params.id);
            const ans1= await student.deleteMany({ phonenumber: req.params.id });
 res.status(201).json({
            message: 'Successfully deleted'
          });

        }
    

 }
 catch(err){
 res.status(201).json({
            message: 'error in deleting this id !'
          });
 }

   

});

router.put('/', (req, res) => {
  console.log(typeof (req.body.phonenumber));
  var a = parseInt(req.body.phonenumber);
  student.find({ phonenumber: a }, function (err, ans) {

    if (ans.length == 0 || err) {
      res.status(201).json({
        message: 'this phonenumber is Not Present in Database'
      });
    }
    else {
      student.updateMany({ phonenumber: a }, { $set: { name: req.body.name } }, function (err) {
        if (err) {
          res.status(201).json({
            message: 'error in updating this id !'
          });
        }
        else {
          res.status(201).json({
            message: 'updated successfully!'
          });
        }

      })
    }
  })
})


module.exports = router;