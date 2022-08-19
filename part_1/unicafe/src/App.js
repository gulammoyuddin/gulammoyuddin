import { useState } from 'react'
const Button = ({ onClick, text }) =>{
  return(
    <button onClick={onClick}>
      {text}
    </button>
  )
}
const Statistics=(props)=>{
  const good=props.good
  const neutral=props.neutral
  const bad =props.bad
  const all=good+neutral+bad;
  let ave=good-bad
  ave=ave / all 
  let pos=good / all
  pos=pos*100
  if (all === 0) {
    return(
      <div>no feedback is given</div>
    )
  } else {
  return(
    <div>
      <table>
        <tbody>
      <Statisticline text='good ' number={good} />
      </tbody>
      <tbody>
      <Statisticline text='neutral ' number={neutral} />
      </tbody>
      <tbody>
      <Statisticline text='bad ' number={bad} />
      </tbody>
      <tbody>
      <Statisticline text='all ' number={all} />
      </tbody>
      <tbody>
      <Statisticline text='average ' number={ave} />
      </tbody>
      <tbody>
      <Statisticline text='positive ' number={pos+' %'} />
      </tbody>
      </table>
    </div>    
  )}
}

const Statisticline = ({ text, number })=>{
  return(
    
    <tr>
      <td>
      {text}
      </td>
      <td>
      {number}
      </td>
    </tr>
    
  )
}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all=good+neutral+bad;
  const ave=good-bad / all
  const pos=good / all
  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={()=>setGood(good+1)} text='good'/>
      <Button onClick={()=>setNeutral(neutral+1)} text='nuetral'/>
      <Button onClick={()=>setBad(bad+1)} text='bad'/>
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App
