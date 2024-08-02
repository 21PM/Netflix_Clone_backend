const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const userSchema = new mongoose.Schema({
        fullName:{
            type:String,
            required:true,
        },
        email:{
            type:String,
            required:true,
            unique:true                                                                                                                     
        },
        password:{
            type:String,
            required:true,
        },
        token:{
            type:String,
            required:false,
        }
},
{
    timestamps:true
})


userSchema.pre("save",function(next){
    if(this.isModified("password")){
        const hashedpassword =  bcrypt.hashSync(this.password,10)
        this.password = hashedpassword;
    }
    next()
})

const userModel = mongoose.model("users",userSchema)

module.exports = userModel;