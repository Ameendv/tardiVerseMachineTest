const express =require('express')
const app=express()
const userAuth=require('../../controller/user/auth')

app.post('/user-signup',userAuth.userSignup)

app.post('/user-login',userAuth.userLogin)

module.exports=app;