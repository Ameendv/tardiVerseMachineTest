const express=require('express')
const app=express()
const User = require('../../models/user')
const {createError} =require('../../createError/createError')
const bcrypt=require('bcrypt')

module.exports={
    userSignup:async(req,res,next)=>{
        try{
            const userExist = await User.findOne({email:req.body.email})
           if(!userExist){
            const hashedPassword=await bcrypt.hash(req.body.password,10)
            req.body.password=hashedPassword
            
            
           await User.create(req.body).then((data)=>{
            res.sendStatus(200)
           }).catch((error)=>{
            next(createError(500))
           })

           
           }else{
            next(createError(409,'User already exist.Please Login'))
           }
        }catch(error){

        }
    },
    userLogin:async(req,res,next)=>{
       await User.findOne({email:req.body.email}).then(async(data)=>{
        if(!data){
            next(createError(404,'User not found'))
        }else if(await  bcrypt.compare(req.body.password,data.password)){

            const {username,email}=data
            
            res.status(200).json({username,email})
        }else{
            next(createError(401,'Incorrect password'))
        }
       }).catch((error)=>{
        console.log(error)
       }) 
    }
}