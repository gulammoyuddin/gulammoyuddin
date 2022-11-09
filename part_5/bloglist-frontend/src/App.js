import { useState, useEffect,useRef } from 'react'
import Blog from './components/Blog'
import Createblog from './components/Createblog'
import Toggleelement from './components/Toggleelement'
import blogService from './services/blogs'
import loginservice from './services/login'
const Notifysuccess=(props) => {
  if(props.message===null){
    return null
  }
  return (
    <div className='Success'>{props.message}</div>
  )
}
const Notifyerror=(props) => {
  if(props.message===null){
    return null
  }
  return (
    <div className='Error'>{props.message}</div>
  )
}
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user,setUser]=useState(null)
  const [username,setUsername]=useState('')
  const [password,setPassword]=useState('')
  const [newSuccess,setNewSuccess]=useState(null)
  const [newError,setNewError]=useState(null)
  //const [chan,setChan ]=useState("")
  const blogformref=useRef()
  //setBlogs(blogs.sort((a,b)=>{return b.likes-a.likes}))
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((a,b) => {return b.likes-a.likes}) )
    )
  }, [])
  useEffect(() => {
    const userJson=window.localStorage.getItem('loggeduser')
    if(userJson){
      const us=JSON.parse(userJson)
      setUser(us)
      blogService.setToken(us.token)
    }
  },[])
  const handlelogin=async (event) => {
    event.preventDefault()
    try{
      const usr =await loginservice.login({
        username,
        password
      })
      //console.log(usr)
      window.localStorage.setItem('loggeduser',JSON.stringify(usr))
      blogService.setToken(usr.token)
      setUser(usr)
      setUsername('')
      setPassword('')
    }catch(exception){
      setNewError('Invalid credentials')
      setTimeout(() => setNewError(null),5000)
    }
  }
  const handlelogout=() => {
    window.localStorage.removeItem('loggeduser')
    blogService.setToken('')
    setUser(null)
  }
  const handlecreate=async(title,author,url) => {
    blogformref.current.togglevisibility()
    try{
      const resp=await blogService.addBlog({
        title,
        author,
        url
      })
      setBlogs(blogs.concat(resp))
      setNewSuccess(`a new blog ${title} by ${user.name} added`)
      setTimeout(() => setNewSuccess(null),5000)
    }catch(exception){
      setNewError(exception.response.data.error)
      setTimeout(() => setNewError(null),5000)
    }
  }
  const handleupdate=async(id,title,author,url,likes) => {
    try{
      await blogService.updateLike({
        id,
        title,
        author,
        url,
        likes
      })
      const resp=await blogService.getAll()
      setBlogs(resp.sort((a,b) => {return b.likes-a.likes}))
    }catch(exception){
      setNewError(exception.response.data.error)
      setTimeout(() => setNewError(null),5000)
    }
  }
  const handledelete=async(id) => {
    try{
      await blogService.deleteBlog(id)
      const resp=await blogService.getAll()
      setBlogs(resp.sort((a,b) => {return b.likes-a.likes}))
    }catch(exception){
      setNewError(exception.response.data.error)
      setTimeout(() => setNewError(null),5000)
    }
  }
  if(user===null){
    return(
      <div>
        <Notifyerror message={newError}/>
        <h2>Log in to application</h2>
        <form>
          <div>
          username
            <input
              id='username'
              type="text"
              value={username}
              className="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
          password
            <input
              id='password'
              type="password"
              value={password}
              className="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <div>
            <button type="submit" onClick={handlelogin}>login</button>
          </div>
        </form>
      </div>
    )
  }
  return (
    <div>
      <h2>blogs</h2>
      <Notifysuccess message={newSuccess}/>
      <Notifyerror message={newError}/>
      <div>
        {user.name} logged in
        <button id='logoutbutton' onClick={handlelogout}>log out</button>
      </div>
      <Toggleelement buttonLabel='create blog' ref={blogformref}>
        <Createblog
          handlecreate={handlecreate}
        />
      </Toggleelement>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} handleupdate={handleupdate} handledelete={handledelete} user={user}/>
      )}
    </div>
  )
}

export default App
