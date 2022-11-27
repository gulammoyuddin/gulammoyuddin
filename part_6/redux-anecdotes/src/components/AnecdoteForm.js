//import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"
import { connect } from "react-redux"
//import { createNotify,resetNotify } from "../reducers/notificationReducer"
//import anecdotes from "../services/anecdotes"

const AnecdoteForm=  (props)=>{
//    const dispatch=useDispatch()
    const add= async (event)=>{
        event.preventDefault()
        const anecdote=event.target.anecdote.value
        event.target.anecdote.value=''
        //const newanecdote = await anecdotes.createNew(anecdote)
        props.createAnecdote(anecdote)
        props.setNotification(`you created '${anecdote}'`,5)
      }
    return(
        <div>
        <h2>create new</h2>
      <form onSubmit={add}>
        <div><input name='anecdote'/></div>
        <button type='submit'>create</button>
      </form>
        </div>
    )
}
export default connect(null,{ setNotification,createAnecdote })(AnecdoteForm)