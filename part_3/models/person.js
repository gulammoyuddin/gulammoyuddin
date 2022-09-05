const mongoose=require('mongoose')
// eslint-disable-next-line no-undef
const url=process.env.MONGODB_URI
mongoose.connect(url).then(() => {
  console.log('connected')
}).catch(err => {
  console.log('error occured '+err)
})
const personSchema=new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    minLength:8,
    validate: {
      validator: v => {
        if(v.includes('-')){
          return /^(\d{3}|\d{2})-\d+$/.test(v)
        }else{
          return true
        }
      },
      message: props => `${props.value} is a invalid phone number`
    }
  }
})
personSchema.set('toJSON',{
  transform:(document,returnObject) => {
    returnObject.id=returnObject._id.toString()
    delete returnObject._id
    delete returnObject.__v
  }
})
module.exports=mongoose.model('Person',personSchema)