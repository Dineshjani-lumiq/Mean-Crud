const express = require('express');
const bodyParser = require('body-parser');
var app=express();
var cors=require('cors');
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // to enable calls from every domain 
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE'); // allowed actiosn
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); 
  
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200); // to deal with chrome sending an extra options request
    }
  
    next(); // call next middlewer in line
  });
const { mongoose } = require('./db.js');
var employeeController = require('./controllers/employeecontroller.js');


app.use(bodyParser.json())

app.listen(8559, () => console.log('Server started at port : 3045'));


app.use('/students', employeeController);