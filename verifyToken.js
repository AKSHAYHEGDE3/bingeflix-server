const jwt = require('jsonwebtoken');

const verify = (req,res,next) =>{
    console.log("----verify----")
    console.log(req.headers.token)
    const authHeaders = req.headers.token;
    if(authHeaders){
        const token = authHeaders.split(" ")[1];
        jwt.verify(token,process.env.SECRET_TOKEN_KEY,(err,user)=>{
            if(err){
                // return res.status(401).json("not a valid token")
                console.log("not a valid token")
            } 
            req.user = user;
            console.log(req.user)
            next();
            
        })
    } else{
        // res.status(401).json("You are not authenticated!");
        next();
      
    }
}

module.exports = verify;