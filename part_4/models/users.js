const mongoose=require('mongoose')
const usersschema= new mongoose.Schema({
    username:String,
    name:String,
    passwordhash:String,
    blogs:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Blog'
        }
    ],
})
usersschema.set('toJSON',{
    transform :(document,returnedObject)=>{
        returnedObject.id=returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordhash
    }
})
module.exports=mongoose.model('User',usersschema)