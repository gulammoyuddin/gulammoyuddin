import { useState,useEffect } from 'react'
import axios from 'axios'
const Showcond=({ a,w })=>{
  if(a.length>0){
    return <div>{a.map(to=><Displayall a={to} key={to.name.official} q={w}/>)}</div>
  }
}
const Displayall=({ a,q })=>{
  console.log(q)
  const q1=q.filter(t=>t.name===a.capital[0])
  console.log(q1)
  const r='http://openweathermap.org/img/wn/'+q1[0].weather[0].icon+'.png'
//  console.log(r)
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
          <div>
            <h2>Weather in {a.capital}</h2>
            <div>temperature {q1[0].main.temp} Celsius</div>
            <img src={r} width='200'/>
            <div>wind {q1[0].wind.speed} m/s</div>
          </div>
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
  const Cond=({ s,buttonclick,w })=>{
    if(s.length>10){
      return <p>Too many matches,specify another filter</p>
    }else{
      if(s.length===1){

        return <Displayall a={s[0]} q={w}/>
      }else{
        return <Displayname a={s} buttonclick={buttonclick}/>
      }
    }
  }
function App() {
  const [ newFilter,setNewFilter ]=useState('')
  const [ countries,setcountries ]=useState([])
  const [ showCountries,setshowCountries ]=useState([])
  const [ newWeather,setnewWeather ]=useState([])
  let s=[]
  const buttonclick=(to)=>{                                           //this is function for handling onclick event for each button
   // setshowCountries(showCountries.concat(to))
   return ()=>{                                                       //this is the function returned by button click which actually handles the event

    //console.log('button click for '+to.name.common)
    const fr = showCountries.filter(k=>k===to)                        /**this line 69 to 77 filters the array when the button is clicked to show the view of individual country */
    if(fr.length===0){
    setshowCountries(showCountries.concat(to))
    }else{
      const fl=showCountries.filter(k=>k!==to)
      setshowCountries(fl)
    }
   }
  }
 // console.log(showCountries)
  useEffect(()=>{                                                     //first effect hook to get data of countries
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(response=>{
      //console.log('promise fullfilled')
      setcountries(response.data)
    })
  },[])
  
//  s=countries.filter(cn => cn.name.common.substring(0,newFilter.length).toLowerCase()===newFilter.toLowerCase())
  s=countries.filter(cn => cn.name.common.toLowerCase().includes(newFilter.toLowerCase()))  
 //console.log(s)
 
//  useEffect(hook(s),[])
 
 const hook=(s)=>{
  return ()=>{
  const g=s.map(t=>t.capital)
  if(g.length<10){
    //console.log('it is executed')
    const r=g.map(t=>'https://api.openweathermap.org/data/2.5/weather?q='+t+'&appid='+process.env.REACT_APP_API_KEY+'&units=metric')
    //console.log(r)
    axios.all(r.map(url=>axios.get(url))).then(response=>setnewWeather(response.map(y=>y.data)))
      
}
}
 }
 useEffect(hook(s),[newFilter])
 //console.log(newWeather)
 const handleChange=(event)=>{                                       /*this the method for handling changes in search query*/ 
    setshowCountries([])
   // setgetData([])
//    setnewWeather([])
    setNewFilter(event.target.value)
  }
  return (
    <div>
      find countries <input value={newFilter} onChange={handleChange}/>
      <Cond s={s} buttonclick={buttonclick} w={newWeather}/>
      <Showcond a={showCountries} w={newWeather}/>
    </div>
  );
}

export default App;
