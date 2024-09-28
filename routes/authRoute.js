const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const User = require("../models/User")

//register route

router.post("/register",async(req,res)=>{
    const {name,email,password}=req.body;
    try{
        //check if user already exits

        let user = await User.findOne({email})

        if(user){
            return res.status(404).json({msg:"User already registered"})
        }
        user =  new User({
            name,
            email,
            password,
        })

        //encrypt password
        const enrpyted = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(enrpyted,password)

        // create token
        const payload = {user:{id:user.id}}
        const token = jwt.sign(payload,process.env.JWT_SECRET_KET,{expiresIn:"1h"})
        res.json({token})

    }catch(error){
        return res.status(401).json({msg:"Server error"})
    }
})


router.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    try{
        let user = await User.findOne({email})

        if(!user){
            return res.status(401).json({msg:"no user"})
        }
        const isMatch=await bcrypt.compare(password,user.password)

        if(!isMatch){
            return res.status(401).json({msg:"no user with this password"})
        }
        const payload = {user:{id:user.id}}
        const token = jwt.sign(payload,process.env.JWT_SECRET_KET,{expiresIn:"1h"})
        res.json({token})
    }catch(error){
        res.status(500).json({msg:"ERROR"})
    }
})

module.exports = router;