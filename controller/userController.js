const userModel = require("../models/usermodel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv");
const cookies = require("cookie-parser")

dotenv.config()


const UserRegistration = async(req,res)=>{

    const {fullName,email,password} = req.body

    if(!fullName || !email || !password){
        return res.json({
            status:false,
            message:"Please provide fullname , email and passsword"
        })
    }

    try{
        const IsUserRegistered = await userModel.findOne({email})
        console.log(IsUserRegistered);

        if(IsUserRegistered){
            return res.status(401).json({
                status:false,
                message:'Your Email Id is already registered'
            })
        }

        const userData = {
            fullName:fullName,
            email:email,
            password:password
        }

        await userModel.create(userData)

        return res.json({
            status:true,
            message:"User registered sucessfully"
        })

    }catch(e){
        console.log(e);
        return res.json({
            message:"Unable to create your account something went wrong",
            error:e
        })
    }
 
}


const UserLogin = async(req,res)=>{
    const {email,password} = req.body;
  
    
    if(!email || !password){
        return res.status(401).json({
            status:false,
            message:"Please provide email and password"
        })
    }

    try{

        const user = await userModel.find({email:email})
        if(!user){
            return res.status(404).json({
                status:false,
                message:"Email Id is not register", 
            })
        }
        
        
        const isCorrectPassword = bcrypt.compareSync(password,user[0].password)
        if(!isCorrectPassword){
            return res.status(401).json({
                status:false,
                message:"Invalid Email Id or Password"
            })
        }

        const currentTime = Math.floor(new Date().getTime() / 1000);
        const expiryTime = currentTime + (60 * 60 * 24);

        const jsonPayload = {
            userId:user[0]._id,
            userName:user[0].fullName,
        }
        const token = jwt.sign(jsonPayload,process.env.JWTSECRETKEY,{ expiresIn: '1h' })
        const addTokenInUser = await userModel.findByIdAndUpdate(user[0]._id,{
            $set:{
            token:token
            }
        })
        console.log("logged in");
       res.cookie("token",token,{
                httpOnly:true,
                secure:true,    
                sameSite:'None'
        }).json({
            status:true,
            message:"You are sucessfully logged In",
            token:token,
            user:user[0]
        })
        
        

    }catch(e){
        console.log(e);
        return res.status(403).json({
            status:false,
            message:"Something went wrong",
            error:e
        })
    }

}


const UserLogout = async (req,res)=>{

    console.log("logout 0");
    
    try{
        const DeleteToken = await userModel.findByIdAndUpdate(req.user._id,{
            $set:{
                token:null
            }
        })
        console.log("logout 1");

        return res.status(200).cookie("token","",{expiresIn:new Date(Date.now()),httpOnly:true}).json({
            status:true,
            message:"You are sucessfully logged Out"
        })
    }catch(e){
        console.log(e);
        return res.json({
            status:false,
            message:"Something went wrong unable to logout"
        })
    }
}


const userController = {
    UserRegistration,
    UserLogin,
    UserLogout
}

module.exports = userController