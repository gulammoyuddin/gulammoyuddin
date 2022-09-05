//const { request, response, json } = require('express')
require('dotenv').config()
const express=require('express')
const Person=require('./models/person')
const morgan =require('morgan')
const cors=require('cors')
const app=express()
app.use(cors())
app.use(express.static('build'))
app.use(express.json())
const errorHandler=(error,request,response,next) => {
  console.log(error.message)
  if(error.name ==='CastError'){
    return response.status(400).json({ error:'malformated id' })
  }else if(error.name === 'ValidationError'){
    return response.status(400).json({ error:error.message })
  }
  next(error)
}
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
morgan.token('data',(req) => {
  if(!req.body){
    return
  }
  return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))
app.get('/info',(request,response) => {
  const date=new Date()
  Person.find({}).then(res => {
    const r ='<div><p>phonebook has info for '+res.length+' people</p><p>'+date+'</p></div>'
    response.send(r)
  })
})
app.get('/api/persons',(request,response) => {
  Person.find({}).then(res => {
    response.json(res)
  })
})
app.get('/api/persons/:id',(request,response,next) => {
  Person.findById(request.params.id).then(res => {
    if(res){
      response.json(res)
    }else{
      response.status(404).end()
    }
  }).catch(error => next(error))
})
app.delete('/api/persons/:id',(request,response,next) => {
  Person.findByIdAndRemove(request.params.id)
    .then( () => response.status(204).end())
    .catch(error => next(error))
})
app.post('/api/persons',(request,response,next) => {
  const body=request.body
  if(!body.number){
    return response.status(400).json({
      error:'number is missing'
    })
  }
  if(!body.name){
    return response.status(400).json({
      error:'name is missing'
    })
  }
  let l=[]
  Person.find({}).then(res => {
    l=res.filter(p => p.name===body.name)
    //  console.log(l)
    if(l.length!==0){
    //        console.log(l)
      return response.status(400).json({ error:'name already exist' })
    }
  }).catch( error => next(error))
  //  console.log(l)
  const per=new Person({
    'name' : body.name,
    'number':body.number
  })
  //console.log(person)
  per.save().then(() => response.json(per))
    .catch( error => next(error))
})
app.put('/api/persons/:id',(request,response,next) => {
  const body=request.body
  const person={
    name:body.name,
    number:body.number
  }
  Person.findByIdAndUpdate(request.params.id,person,{ new: true,runValidators:true ,context:'query' })
    .then( res => {
      response.json(res)
    }).catch(error => next(error))
})
app.use(unknownEndpoint)
app.use(errorHandler)
const PORT = process.env.PORT || 3001
app.listen(PORT,() => {
  console.log(`server is running on port ${PORT}`)
})