import { useState } from 'react'
const Createblog=({
  handlecreate
}) => {
  const [ title,setTitle ]=useState('')
  const [ author,setAuthor ]=useState('')
  const [ url,setUrl ]=useState('')
  const addBlog=(event) => {
    event.preventDefault()
    handlecreate(title,author,url)
    setTitle('')
    setAuthor('')
    setUrl('')
  }
  return(
    <div>
      <h2>create new</h2>
      <form>
        <div>
            title:
          <input
            id='title'
            type="text"
            value={title}
            className="Title"
            onChange={({ target }) => setTitle(target.value)}
            placeholder="write title here"
          />
        </div>
        <div>
            author:
          <input
            id='author'
            type="text"
            value={author}
            className="Author"
            onChange={({ target }) => setAuthor(target.value)}
            placeholder="write author here"
          />
        </div>
        <div>
            url:
          <input
            id='url'
            type="url"
            value={url}
            className="Url"
            onChange={({ target }) => setUrl(target.value)}
            placeholder="write url here"
          />
        </div>
        <button id='createbutton' type="submit" onClick={addBlog}>create</button>
      </form>
    </div>
  )
}
export default Createblog