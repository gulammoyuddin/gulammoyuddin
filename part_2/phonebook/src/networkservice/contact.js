import axios from 'axios'
const baseUrl='http://localhost:3001/persons'
const getAll=()=>{
    const req=axios.get(baseUrl)
    return req.then(response=>response.data)
}
const addCon=(obj)=>{
    const req=axios.post(baseUrl,obj)
    return req.then(response=>response.data)
}
const delCon=(id)=>{
    return axios.delete(baseUrl+'/'+id)
}
const updateCon=(id,obj)=>{
    return axios.put(baseUrl+'/'+id,obj).then(response=>response.data)
}
export default { getAll, addCon ,delCon ,updateCon }