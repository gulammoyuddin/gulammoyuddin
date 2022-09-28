const { json }=require('express')
const app=require('../app')
const supertest=require('supertest')
const mongoose=require('mongoose')
const User=require('../models/users')
const api=supertest(app)
const us=[
    {
        'username':'hellas',
        'name':'Arto Hellas',
        'password':'hellapure'
    },
    {
        'username':'mluukkai',
        'name':'Matti Luukkainen',
        'password':'Sainen'
    }
]
beforeEach(async()=>{
    await User.deleteMany({})
    const users=us.map(t=>new User(t))
    const allpromise=users.map(t=>t.save())
    await Promise.all(allpromise)
})
    /*beforeEach(async()=>{
        await User.deleteMany({})
        const users=us.map(t=>new User(t))
        const allpromise=users.map(t=>t.save())
        await Promise.all(allpromise)
    })*/
describe('test for users',()=>{
    test('test for http get',async ()=>{
        const result=await api
        .get('/api/users')
        .expect(200)
        .expect('Content-Type',/application\/json/)
        expect(result.body).toHaveLength(us.length)
    })
    test('test for http post',async ()=>{
        const newUser={
            'username':'moyuddin',
            'name':'Gulam Moyuddin',
            'password':'gulmoh'
        }
        const result=await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type',/application\/json/)
        expect(result.body.username).toBe(newUser.username)
        const res = await api.get('/api/users')
        expect(res.body).toHaveLength(us.length+1)
    })

//afterAll(()=>mongoose.connection.close())
})
describe('test for http post validation',()=>{
    test('test for username and password definition',async ()=>{
        const newUser={
            'name':'yash'
        }
        const result=await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        expect(result.body.error).toBe('username or password is not defined')
        const all=await api.get('/api/users')
        expect(all.body).toHaveLength(us.length)
    })
    test('test for username and password length',async ()=>{
        const newUser={
            'username':'ys',
            'name':'yash',
            'password':'yash123'
        }
        const res1=await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        expect(res1.body.error).toBe('username and password length must be atleast 3')
        newUser['username']='yashjain'
        newUser['password']='yt'
        const res2=await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        expect(res2.body.error).toBe('username and password length must be atleast 3')
        const all=await api.get('/api/users')
        expect(all.body).toHaveLength(us.length)
    })
    test('test for unique username',async()=>{
        const newUser={
            'username':us[0].username,
            'name':us[0].name,
            'password':'ticktock'
        }
        const res = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        expect(res.body.error).toBe('username must be unique')
        const all=await api.get('/api/users')
        expect(all.body).toHaveLength(us.length)
    })
})
afterAll(()=>mongoose.connection.close())

