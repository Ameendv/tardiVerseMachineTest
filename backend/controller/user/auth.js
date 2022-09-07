const express=require('express')
const app=express()
const User = require('../../models/user')
const {createError} =require('../../createError/createError')

module.exports={
    userSignup:async(req,res,next)=>{
        try{
            const userExist = await User.findOne({email:req.body.email})
           if(!userExist){
            
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
    }
}