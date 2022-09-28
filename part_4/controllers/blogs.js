const jwt=require('jsonwebtoken')
const blogsrouter = require('express').Router()
const { response } = require('express')
const { request } = require('../app')
const Blog=require('../models/blog')
const User=require('../models/users')
const { userExtractor, tokenExtractor } = require('../utils/middleware')

blogsrouter.get('/',async (request, response) => {
  const blogs =await Blog.find({}).populate('user',{ username:1 , name:1})  
  response.json(blogs)
})
blogsrouter.post('/',tokenExtractor,userExtractor,async (request, response) => {
  if(!request.body.author||!request.body.title){
    return response.status(400).end()
  }
  const user=request.user
  //console.log(request.token)
  const newblog={
    'title':request.body.title,
    'author':request.body.author,
    'url':request.body.url,
    'likes':request.body.likes | 0,
    'user':user._id
  }
  const blog = new Blog(newblog)

  const result=await blog.save()
  //console.log(user)
  user.blogs=user.blogs.concat(result._id)
  await user.save()
  response.status(201).json(result)
    
})
blogsrouter.delete('/:id',tokenExtractor,userExtractor,async (request,response)=>{
  const user =request.user
  const userid=user._id
  const blog=await Blog.findById(request.params.id)
  if(blog.user.toString()!==userid.toString()){
    return response.status(400).json({error:`${decodedtoken.username} do not have access`})
  }
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})
blogsrouter.put('/:id',async (request,response)=>{
  r=request.body
  const blog={
    'title':r.title,
    'author':r.author,
    'url':r.url,
    'likes':r.likes | 0
  }
  const res=await Blog.findByIdAndUpdate(request.params.id,blog,{new: true})
  response.json(res)
})

module.exports=blogsrouter