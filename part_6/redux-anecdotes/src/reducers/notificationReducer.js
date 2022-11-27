import { createSlice } from "@reduxjs/toolkit";
const initialState=null

/*export const createNotify=(content)=>{
    return {
        type:'notify/newNotification',
        payload:content
    }
}
export const resetNotify=()=>{
    return {
        type:'notify/resetNotification'
    }
}*/
const notificationslice=createSlice({
    name:'notify',
    initialState,
    reducers:{
        newNotification(state,action){
            const not=action.payload
            return not
        },
        resetNotification(state,action){
            return null
        }
    },
})
export const { newNotification,resetNotification }=notificationslice.actions
export const setNotification=(content,time)=>{
    return dispatch=>{
        dispatch(newNotification(content))
        clearTimeout()
        setTimeout(()=>{dispatch(resetNotification(''))},time*1000)
    }
}
export default notificationslice.reducer