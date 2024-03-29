import axios from 'axios'
const baseUrl='http://localhost:3001/anecdotes'
const getAll=async()=>{
    const res=await axios.get(baseUrl)
    return res.data
}
const createNew=async(content)=>{
    const object={
        content,
        votes:0
    } 
    const res =await axios.post(baseUrl,object)
    return res.data
}
const voteOne=async(id)=>{
    const data=(await axios.get(baseUrl)).data
    const tochange=data.find(t=>t.id===id)
    const changed={
        ...tochange,votes:tochange.votes+1
    }
    const res=await axios.put(baseUrl+`/${id}`,changed)
    return res.data
}
export default { getAll,createNew,voteOne }