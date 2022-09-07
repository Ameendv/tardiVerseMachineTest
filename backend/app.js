const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const express=require('express')
const app=express()
const cors=require('cors')

require('dotenv').config()
const mongoose=require('mongoose')
const userRoutes=require('./routes/user/user')

mongoose.connect('mongodb://localhost:27017/tardiverseTest').then((done,error)=>{
    if(error){
        console.log(error)
    }else{
        console.log('Database is connected')
    }
})

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieParser())

app.use('/api',userRoutes)

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500
  
    const errorMessage = err.message || "Something went wrong !"
  
    return res.status(errorStatus).json({
      success: false,
      status: errorStatus,
      message: errorMessage,
      stack: err.stack
    })
  })



app.listen(process.env.PORT,()=>{
    console.log(`Server running at port ${process.env.PORT}`)
})



