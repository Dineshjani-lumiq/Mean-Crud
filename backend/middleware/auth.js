const jwt=require("jsonwebtoken");
const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk';

const auth=async(req,res,next)=>{
    console.log("middleware called");
    try{
const token=req.headers['authorization'];
console.log(token);
if(!token){
    res.status(401).send('you are not logged in');

}
else{
    console.log("verify token");
    
      tokenslice = token.slice(7);
      console.log(tokenslice);
     jwt.verify(tokenslice, JWT_SECRET, (err, decoded) => {
if(err){
    console.log(err);
             
                   res.status(401).send('expired token');


}
else{
console.log("you are allowed to secret infomation because you token is valid");
next();
}
     })
}
  
    }catch(error){
res.status(401).send(error);
    }
}
module.exports=auth;