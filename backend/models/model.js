const mongoose = require('mongoose');

var student = mongoose.model('student', {
     name: { type: String },
     phonenumber:{type:Number},
     dateofbirth:{type:String},
     gender:{type:String},

    address: [String ],
    
    marks:[String]
    
});

module.exports = { student };