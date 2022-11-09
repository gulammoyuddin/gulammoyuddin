import { useState } from 'react'

const Blog = ({ blog,handleupdate,handledelete,user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [ visible,setVisible ]=useState(false)
  const showit={ display:visible?'':'none' }
  const buttonLabel=visible?'hide':'view'
  const toggleit=() => {
    setVisible(!visible)
  }
  const updateLike=(event) => {
    event.preventDefault()
    handleupdate(blog.id,blog.title,blog.author,blog.url,blog.likes+1)
  }
  const removeit=(event) => {
    event.preventDefault()
    const del=window.confirm(`remove blog ${blog.title} by ${blog.author}`)
    if(del){
      handledelete(blog.id)
    }
  }
  let deldisp
  if(user){
    deldisp={
      display:(user.username===blog.user.username)?'':'none'
    }
  }else{
    deldisp={ display:'none' }
  }
  //console.log(blog.id)
  return (
    <div className='blog' style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleit}>{buttonLabel}</button>
      </div>
      <div style={showit} className='extrainfo'>
        <div>{blog.url}</div>
        <div>likes {blog.likes}
          <button onClick={updateLike}>like</button>
        </div>
        <div>{blog.user.name}</div>
        <div style={deldisp}>
          <button onClick={removeit}>remove</button>
        </div>
      </div>
    </div>
  )}
export default Blog