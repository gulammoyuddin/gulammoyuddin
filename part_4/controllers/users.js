const userrouter=require('express').Router()
const { response }=require('express')
const { request }=require('../app')
const User=require('../models/users')
const bcrypt=require('bcrypt')

userrouter.post('/',async (request,response)=>{
    const { username,name,password } = request.body
    if(!(username&&password)){
        return response.status(400).json({
            error:'username or password is not defined'
        })
    }
    if(!(username.length>=3&&password.length>=3)){
        return response.status(400).json({
            error:'username and password length must be atleast 3'
        })
    }
    const userName=await User.findOne({ username })
    if(userName){
        return response.status(400).json({
            error:'username must be unique'
        })
    }
    const saltrounds=10
    const passwordhash=await bcrypt.hash(password,saltrounds)
    newUser={
        'username':username,
        'name':name,
        'passwordhash':passwordhash
    }
    const newuser=new User(newUser)
    const result =await newuser.save()
    response.status(201).json(result)
})
userrouter.get('/',async (request,response)=>{
    const user=await User.find({}).populate('blogs')
    response.json(user)
})

module.exports=userrouter
