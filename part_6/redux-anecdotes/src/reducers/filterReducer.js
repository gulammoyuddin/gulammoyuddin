import { createSlice } from "@reduxjs/toolkit";
const initialState=''
/*export const changeFilter=(content)=>{
    return {
        type:'filter/changeFilter',
        payload:content
    }
}*/
const filterSlice=createSlice({
    name:'filter',
    initialState,
    reducers:{
        changeFilter(state,action){
            return action.payload
        }
    },
})
export const { changeFilter }=filterSlice.actions
export default filterSlice.reducer