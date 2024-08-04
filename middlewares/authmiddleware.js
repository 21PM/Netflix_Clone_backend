const jwt = require("jsonwebtoken")
const userModel = require("../models/usermodel");
const { model } = require("mongoose");
const dotenv = require("dotenv")
dotenv.config()

const authmiddleware = async(req,res,next)=>{

    const token = req.cookies.token;
<<<<<<< HEAD
    
    console.log("all cookies",cookies);
    console.log("tk line 1", req.cookies.token);
    
=======
    console.log("tk",token);
>>>>>>> aaeb634a4d97336e023e86cac4baf30821aae72b
    if(!token){
        return res.status(401).json({
            status:false,
            message:"Please login Invalid token"
        })
    }
  console.log("tk1",token);

    try{
        const isVerifiedToken = await jwt.verify(token,process.env.JWTSECRETKEY)  
          console.log("tk2",isVerifiedToken);

        const user  = await userModel.findById(isVerifiedToken.userId)
        if(!user){
            return res.status(401).json({
                status:false,
                message:"Please login again Invalid token"
            })
        }

          console.log("user",user);


        req.user = user;
        
        next()
        

    }catch(e){
        return res.json({
            status:false,
            message:"Please login again, Invalid token"
        })
    }

}

module.exports = authmiddleware
