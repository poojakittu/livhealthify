const jwt = require("jsonwebtoken");

const AdminMiddleware = (req, res, next) => {
    const token=req.headers.authorization;
 
    if(!token){
      res.send({msg:"Please login first"})
    }
  
    const decoded=jwt.verify(token, process.env.key);
    
    if(decoded){
     
        req.body.adminId=decoded.adminId;
        next()
    }else{
        res.send({msg:"Please login first"})
    }
};

module.exports = AdminMiddleware;
