import axios from 'axios'
const baseUrl = '/api/blogs'
let token=''

const setToken=(newtoken) => {
  token=`bearer ${newtoken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}
const addBlog=async (newblog) => {
  const config={
    headers: { Authorization:token },
  }
  const res =await axios.post(baseUrl,newblog,config)
  return res.data
}
const updateLike=async(updatedblog) => {
  const res =await axios.put(baseUrl+'/'+(updatedblog.id),updatedblog)
  return res.data
}
const deleteBlog=async(id) => {
  const config={
    headers: { Authorization:token },
  }
  await axios.delete(baseUrl+'/'+id,config)
}
export default { getAll,addBlog,setToken,updateLike,deleteBlog }