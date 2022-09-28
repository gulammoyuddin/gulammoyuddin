require('dotenv').config()
const express = require('express')
const app = express()
require('express-async-errors')
const cors = require('cors')
const mongoose = require('mongoose')
const { errorHandler }=require('./utils/middleware')
const blogsrouter=require('./controllers/blogs')
const userrouter=require('./controllers/users')
const loginRouter=require('./controllers/login')
const mongoUrl = process.env.NODE_ENV==='test'
     ?process.env.TEST_MONGODB_URI
     :process.env.MONGODB_URI
    
mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.json())
app.use('/api/login',loginRouter)
app.use('/api/blogs',blogsrouter)
app.use('/api/users',userrouter)
app.use(errorHandler)
module.exports=app