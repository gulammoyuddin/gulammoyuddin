import { useState,useEffect } from 'react'
import axios from 'axios'
import contactservice from './networkservice/contact'
const Notifysuccess=(props)=>{
  if(props.message===null){
    return null
  }else{
    return(
      <div className='success'>
        {props.message}
      </div>
    )
  }
}
const Notifyerror=(props)=>{
  if(props.message===null){
    return null
  }else{
    return(
      <div className='error'>
        {props.message}
      </div>
    )
  }
}
const Singleperson =({ name, number,onClickbutton })=>{
  return(
    <div>
    {name} {number}
    <button onClick={onClickbutton}>delete</button>
    </div>
)
}
const Allperson =({ persons,onClick })=>{
  return(
    <div>
   {persons.map((person)=><Singleperson key={person.name} name={person.name} number={person.number} onClickbutton={()=>onClick(person.id)}/>)}
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
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newPhone ,setNewPhone]=useState('')
  const [newFilter, setNewFilter]=useState('')
  const [newSuccess, setNewSuccess ]=useState(null)
  const [newError,setNewError ]=useState(null)
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
    contactservice.addCon(newObj).then(response=>{
      setPersons(pot.concat(response))
      setNewName('')
      setNewPhone('')  
      setNewSuccess('Added '+newObj.name)
      setTimeout(()=>setNewSuccess(null),5000)
    })
  }else{
    const upd =window.confirm(po[0].name +'is already added to phonebook,replace the old number with a new one?')
    if(upd){
      const ncon={...po[0],number : newPhone}
      contactservice.updateCon(ncon.id,ncon)
      .then(res=>{
        setPersons(persons.map(n=>n.id !== res.id? n : res))
        setNewName('')
        setNewPhone('')
      })
      .catch(error=>{
        setNewError('Information of '+ncon.name+' was already removed from the server')
        setTimeout(()=>setNewError(null),5000)
      })
    }
  }
  }
  const hook= ()=>{
    contactservice.getAll().then(response=>{
      console.log("promise fulfilled")
      setPersons(response)
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
  const onClick=(id)=>{
    const f=persons.find(con=>con.id===id)
    const del=window.confirm('Delete '+f.name+'?')
    if(del){
      contactservice.delCon(id).then(res=>console.log(f.name +'deleted'))
    }
    const t=persons.filter(person=>person.id!==id)
    setPersons(del?t:persons)
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
      <Notifysuccess message={newSuccess}/>
      <Notifyerror message={newError}/>
      <Filterpro Filter={newFilter} handleChangeFilter={handleChangeFilter}/>
      <Addperson addNote={addNote} Name={newName} Phone={newPhone} handleChangeName={handleChangeName} handleChangePhone={handleChangePhone}/>
      <h2>Numbers</h2>
      <Allperson persons={showit} onClick={onClick}/>
    </div>
  )
}

export default App
