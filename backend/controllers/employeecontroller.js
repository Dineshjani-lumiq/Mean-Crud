const express = require('express');
const app=express();
var router = express.Router();
var User =require('../models/user');
const bcrypt = require('bcrypt');
const auth=require('../middleware/auth');
var cors = require('cors');
app.use(cors())

var { student } = require('../models/model');

const jwt = require('jsonwebtoken')

const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk';

// => localhost:3000/employees/
/*
router.get('/', (req, res) => {
    student.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { res.send(err); }
    });
});

*/
router.get('/',auth,async (req, res) => {
  console.log(req);
  try{

   const docs= await student.find({});
   res.send(docs);
  }
   catch(err){
res.send(err);
   }
       
 
});
router.get('/:id',auth, async (req, res) => {
  try{

   const docs= await student.find({phonenumber: req.params.id });
   console.log(docs);
   res.send(docs);
  }
   catch(err){
res.send(err);
   }
       
 
});
router.post('/',auth, async(req, res) => {
  /*
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
  */
 try{
const doc = await student.findOneAndUpdate(
  { phonenumber: req.body.phonenumber },
  { $set: { name: req.body.name,dateofbirth:req.body.dateofbirth,gender:req.body.gender,address:req.body.address,marks:req.body.marks} },
  { upsert: true, new: true }
);
res.send(docs);
 }
catch(err){
res.send(err);
}
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

router.delete('/:id', auth,async (req, res) => {
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
            console.log(ans1);
res.send(ans1);

        }
    

 }
 catch(err){
 res.status(201).json({
            message: 'error in deleting this id !'
          });
 }

   

});

router.put('/',auth, (req, res) => {
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

router.post('/signup',async(req,res)=>{
  console.log(req.body);
  console.log("from server");
  const username = req.body.Username;
    const plainPassword=req.body.Password;
    	const password = await bcrypt.hash(plainPassword, 10);
      try {
		const response = await User.create({
			username,
			password
		})
		console.log('User created successfully: ', response)
	} catch (error) {
		if (error.code === 11000) {
			// duplicate key
			return res.json({ status: 'error', error: 'Username already in use' })
		}
		throw error
	}

res.status(201).json({
            message: 'Successfully registered'
          });

})

router.post('/signin',async(req,res)=>{
    
	const username = req.body.Username;
    const password=req.body.Password;
	const user = await User.findOne({ username:username })

	if (!user) {
		return res.json({ status: 'error', error: 'Invalid username' })
	}

	if (await bcrypt.compare(password, user.password)) {
		// the username, password combination is successful

		const token = jwt.sign(
			{
				id: user._id,
				username: user.username
			},
			JWT_SECRET,
            {
                    expiresIn: 120 // expires in 2 minute
                }
		)
        

		return res.json({ status: 'ok', accesstoken: token})
	}

	res.json({ status: 'error', error: 'Invalid password' })
})


module.exports = router;