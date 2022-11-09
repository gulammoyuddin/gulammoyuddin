
const testingrouter=require('express').Router()
const { response } = require('../app')
const Blogs = require('../models/blog')
const Users=require('../models/users')

testingrouter.post('/reset',async (req,res)=>{
    await Blogs.deleteMany({})
    await Users.deleteMany({})
    res.status(204).end()
})
module.exports=testingrouter