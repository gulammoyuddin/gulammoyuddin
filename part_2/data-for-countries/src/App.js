import { useState,useEffect } from 'react'
import axios from 'axios'
const Showcond=({ a })=>{
  if(a.length>0){
    return <div>{a.map(to=><Displayall a={to} key={to.name.official}/>)}</div>
  }
}
const Displayall=({ a })=>{

  return(
      <div>
          <h1>{a.name.common}</h1>
          <div>capital {a.capital[0]}</div>
  
         <div> area {a.area}</div>
  
          <h2>languages</h2>
          <ul>
              {Object.values(a.languages).map(o=><li key={o}>{o}</li>)}
          </ul>
  
          <img src={a.flags.png} width='200'/>
      </div>
  )
  }
  const Displayname=({ a,buttonclick })=>{
      return (
          <div>
          {a.map(to=><div key={to.name.common}>{to.name.common}<button onClick={buttonclick(to)}>show</button></div>)}
          </div>
      )
  }
  const Cond=({ s,buttonclick })=>{
    if(s.length>10){
      return <p>Too many matches,specify another filter</p>
    }else{
      if(s.length===1){
        return <Displayall a={s[0]}/>
      }else{
        return <Displayname a={s} buttonclick={buttonclick}/>
      }
    }
  }
function App() {
  const [ newFilter,setNewFilter ]=useState('')
  const [ countries,setcountries ]=useState([])
  const [ showCountries,setshowCountries ]=useState([])
  const handleChange=(event)=>{
    setshowCountries([])
    setNewFilter(event.target.value)
  }
  let s=[]
  const buttonclick=(to)=>{
   // setshowCountries(showCountries.concat(to))
   return ()=>{

    console.log('button click for '+to.name.common)
    const fr = showCountries.filter(k=>k===to)
    if(fr.length===0){
    setshowCountries(showCountries.concat(to))
    }else{
      const fl=showCountries.filter(k=>k!==to)
      setshowCountries(fl)
    }
   }
  }
  console.log(showCountries)
  useEffect(()=>{
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(response=>{
      console.log('promise fullfilled')
      setcountries(response.data)
    })
  },[])
  /*const changeCountries=(a)=>{
   return ()=> {
    console.log('countries changed')
    setshowCountries(a)
  }
  }*/
//  s=countries.filter(cn => cn.name.common.substring(0,newFilter.length).toLowerCase()===newFilter.toLowerCase())
  s=countries.filter(cn => cn.name.common.toLowerCase().includes(newFilter.toLowerCase()))  
 //console.log(s)
  return (
    <div>
      find countries <input value={newFilter} onChange={handleChange}/>
      <Cond s={s} buttonclick={buttonclick} />
      <Showcond a={showCountries}/>
    </div>
  );
}

export default App;
