const jwt = require("jsonwebtoken")
const userModel = require("../models/usermodel");
const { model } = require("mongoose");
const dotenv = require("dotenv")
dotenv.config()

const authmiddleware = async(req,res,next)=>{
    console.log("0");

    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    
    
    if(!token){
        return res.status(401).json({
            status:false,
            message:"Please login Invalid token"
        })
    }

    try{
        const isVerifiedToken = jwt.verify(token,process.env.JWTSECRETKEY)  
    console.log("2");
        
        const user  = await userModel.findById(isVerifiedToken.userId)
        if(!user){
            return res.status(401).json({
                status:false,
                message:"Please login again Invalid token"
            })
        }
        console.log("3");

        req.user = user;
        
        next()
        

    }catch(e){
    console.log("4");

        return res.json({
            status:false,
            message:"Please login again, Invalid token"
        })
    }

}

module.exports = authmiddleware