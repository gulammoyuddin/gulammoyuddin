import { voteAnecdote } from "../reducers/anecdoteReducer"
//import { useDispatch,useSelector } from "react-redux"
import { connect } from "react-redux"
//import { create,resetNotify  from "../reducers/notificationReducer"
import { setNotification } from "../reducers/notificationReducer"
const AnecdoteList=(props)=>{
    const anecdotes=props.anecdotes
//    const dispatch=useDispatch()
    const vote = (id) => {
        console.log('vote', id)
        props.voteAnecdote(id)
        props.setNotification(`you voted '${anecdotes.find(t=>t.id===id).content}'`,5)
      }
    return(
        <div>
            {anecdotes.map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id)}>vote</button>
              </div>
            </div>
          )}
          </div>
    )
}
const mapStateToProps=(state)=>{
  return{
    anecdotes:state.anecdotes.filter(t=>t.content.toLowerCase().includes(state.filter.toLowerCase())).sort((a,b)=>b.votes-a.votes)
  }
}
export default connect(mapStateToProps,{
  setNotification,voteAnecdote
})(AnecdoteList)