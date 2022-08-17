const Part = (props) =>{
  return (
    <div>
      <p>{props.name} {props.number}</p>
    </div>
  )
}
const Header =(props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}
const Content =(props) =>{
 // console.log(props)
  const t =props.parts
  return (
    <div>
      <Part name={t[0].name} number={t[0].exercises}/>
      <Part name={t[1].name} number={t[1].exercises}/>
      <Part name={t[2].name} number={t[2].exercises}/>
    </div>
  )
}
const Total = (props) =>{
  const t =props.parts
  const l=t[0].exercises+t[1].exercises+t[2].exercises
  return (
    <div>
      <p> Number of exercises {l}</p>
    </div>
  )
}
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App