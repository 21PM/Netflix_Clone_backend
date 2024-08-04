const express = require("express");
const authmiddleware = require("../middlewares/authmiddleware")
const router = express.Router()

router.get("/verify-token",authmiddleware,(req,res,next)=>{
        return res.status(200).json({
            status:true,
            user:req.user
        })
        // next()
})  


module.exports = router;