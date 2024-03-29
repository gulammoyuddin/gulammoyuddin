import { createSlice } from "@reduxjs/toolkit"
import anecdotes from '../services/anecdotes'
/*const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]*/

/*const getId = () => (100000 * Math.random()).toFixed(0)

 const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}*/

/*export const createAnecdote=(anecdote)=>{
  return {
    type:'ADD',
    data:asObject(anecdote)
  }
}
export const voteAnecdote=(id)=>{
  return {
    type:'INC',
    data:{
      id:id
    }
  }
}*/
const initialState = []

const anecdoteSlice = createSlice ({
 // console.log('state:',state)
 // console.log('log',action)
  name:'anecdote',
  initialState,
  reducers:{
    setAnecdotes(state,action){
      return action.payload
    },
    appendAnecdote(state,action){
      return state.concat(action.payload)
    }
  }  

}
)
export const { appendAnecdote,setAnecdotes }=anecdoteSlice.actions
export const initializeAnecdotes=()=>{
  return async dispatch=>{
    const data=await anecdotes.getAll()
    dispatch(setAnecdotes(data))
  }
}
export const createAnecdote=(content)=>{
  return async dispatch=>{
    const data=await anecdotes.createNew(content)
    dispatch(appendAnecdote(data))
  }
}
export const voteAnecdote=(id)=>{
  return async dispatch=>{
    await anecdotes.voteOne(id)
    const res=await anecdotes.getAll()
    dispatch(setAnecdotes(res))
  }
}
export default anecdoteSlice.reducer