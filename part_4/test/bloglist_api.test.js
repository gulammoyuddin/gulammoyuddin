
const { json } = require('express')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog=require('../models/blog')
const User=require('../models/users')
const api = supertest(app)
const blogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0
    }  
  ]
beforeEach(async ()=>{
    await Blog.deleteMany({})
    await User.deleteMany({})
    const noteObjects=blogs.map(t=>new Blog(t))
    const allpromise=noteObjects.map(t=>t.save())
    await Promise.all(allpromise)
})
test('test for http get',async ()=>{
    await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
    const res =await api.get('/api/blogs')
    expect(res.body).toHaveLength(blogs.length)
},100000)
test('test for id',async ()=>{
    const res=await api.get('/api/blogs')
    const contents=res.body
    //console.log(contents[0])
    expect(contents[0].id).toBeDefined()
},100000)
test('test for http post for blog',async ()=>{
    const rr=await api
    .post('/api/users')
    .send({
        "username":"moyud",
        "name":"gulammoyuddin",
        "password":"gulmoh"
    })
    //console.log(rr.body)
    const re=await api
    .post('/api/login')
    .send({
        "username":"moyud",
        "password":"gulmoh"
    })
    .expect(200)
    //console.log(re.body)
    const newblog={
        'title':'Go To Statement Considered Harmful',
        'author':'Edsger W. Dijkstra',
        'url':'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        'likes': 5
    }
    const token='bearer '+re.body.token
    //console.log(token)
   const rrs= await api
    .post('/api/blogs')
    .set('Authorization',token)
    .send(newblog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
    //console.log(rrs.body)
    const res = await api.get('/api/blogs').expect(200)
    console.log(res.body)
    const titles=res.body.map(r=>r.title)
    expect(res.body).toHaveLength(blogs.length+1)
    expect(titles).toContain('Go To Statement Considered Harmful')

})
test('test for unauthorization',async()=>{
    const newblog={
        'title':'Go To Statement Considered Harmful',
        'author':'Edsger W. Dijkstra',
        'url':'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        'likes': 5
    }
   const res= await api
    .post('/api/blogs')
    .send(newblog)
    .expect(401)
console.log(res.body)
})
test('test for likes',async ()=>{
    const newblog={
        'title':'Go To Statement Considered Harmful',
        'author':'Edsger W. Dijkstra',
        'url':'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html'
    }
    await api
    .post('/api/blogs')
    .send(newblog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const res = await api.get('/api/blogs')
    const likes=res.body.map(r=>r.likes)
    console.log(likes)
    expect(likes).not.toContain(undefined)
})
test('test for author and title',async ()=>{
    const newblog={
        'url':'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        'likes':5
    }
    await api
    .post('/api/blogs')
    .send(newblog)
    .expect(400)

    const res = await api.get('/api/blogs')
    expect(res.body).toHaveLength(blogs.length)
})
    test('test for deleting blog',async ()=>{
        const inibl=await api.get('/api/blogs')
        const notodel=inibl.body[0]

        await api
        .delete(`/api/blogs/${notodel.id}`)
        .expect(204)
        const res = await api.get('/api/blogs')
        expect(res.body).toHaveLength(blogs.length-1)
        const titles=res.body.map(t=>t.title)
        expect(titles).not.toContain(notodel.title)
    })
    test('test for updating blog',async ()=>{
        const inibl=await api.get('/api/blogs')
        const notoupd=inibl.body[0]
        notoupd['likes']=10
        await api
        .put(`/api/blogs/${notoupd.id}`)
        .send(notoupd)
        .expect(200)
        .expect('Content-Type',/application\/json/)

        const res = await api.get('/api/blogs')
        expect(res.body[0].likes).toBe(10)
    })
afterAll(()=>mongoose.connection.close())