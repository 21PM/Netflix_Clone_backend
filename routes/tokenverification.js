const express = require("express");
const authmiddleware = require("../middlewares/authmiddleware")
const router = express.Router()

router.get("/verify-token",authmiddleware,(req,res,next)=>{
        return res.json({
            status:true,
            user:req.user
        })
})


module.exports = router;