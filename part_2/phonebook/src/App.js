import { useState,useEffect } from 'react'
import axios from 'axios'
const Singleperson =({ name, number })=><p>{name} {number}</p>
const Allperson =({ persons })=>{
  return(
    <div>
   {persons.map((person)=><Singleperson key={person.name} name={person.name} number={person.number}/>)}
  </div>
  )
  
}
const Addperson=(props)=>{
  return(
    <div>
    <h2>add a new</h2>
      <form onSubmit={props.addNote}>
        <div>
          name: <input value={props.Name} onChange={props.handleChangeName}/>
        </div>
        <div>number: <input value={props.Phone} onChange={props.handleChangePhone}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      </div>
  )
}
const Filterpro=(props)=>{
  return(
    <div>
        filter shown with <input value={props.Filter} onChange={props.handleChangeFilter}/>
      </div>
  )
}
const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newPhone ,setNewPhone]=useState('')
  const [newFilter, setNewFilter]=useState('')
  const addNote = (event) =>{
    event.preventDefault()
    const po=persons.filter((p)=>p.name===newName)
    if(po.length===0){
    const newObj = {
      name: newName,
      number: newPhone
    }
    //console.log(newObj)
    const pot=persons
    //console.log(pot)
    setPersons(pot.concat(newObj))
    setNewName('')
    setNewPhone('')
  }else{
    window.alert(newName+' is already in phonebook')
    setNewName('')
  }
  }
  const hook= ()=>{
    axios
    .get('http://localhost:3001/persons')
    .then(Response=>{
      console.log('promise fullfilled')
      setPersons(Response.data)
    })
  }
  useEffect(hook,[])
  const handleChangeName=(event)=>{
   // console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleChangePhone=(event)=>{
    setNewPhone(event.target.value)
  }
  const handleChangeFilter=(event)=>{
    setNewFilter(event.target.value)
  }
  let show=true
  if(newFilter!==''){
    show=false
  }
 // console.log(newFilter.toLowerCase())
  const showit=show
  ? persons
  :persons.filter((p)=>p.name.toLowerCase()===newFilter.toLowerCase())
  return (
    <div>
      <h2>Phonebook</h2>
      <Filterpro Filter={newFilter} handleChangeFilter={handleChangeFilter}/>
      <Addperson addNote={addNote} Name={newName} Phone={newPhone} handleChangeName={handleChangeName} handleChangePhone={handleChangePhone}/>
      <h2>Numbers</h2>
      <Allperson persons={showit}/>
    </div>
  )
}

export default App
