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
  return (
    <div>
      <Part name={props.p1} number={props.e1}/>
      <Part name={props.p2} number={props.e2}/>
      <Part name={props.p3} number={props.e3}/>
    </div>
  )
}
const Total = (props) =>{
  return (
    <div>
      <p> Number of exercises {props.e1+props.e2+props.e3}</p>
    </div>
  )
}
const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course}/>
      <Content p1={part1.name} p2={part2.name} p3={part3.name} e1={part1.exercises} e2={part2.exercises} e3={part3.exercises}/>
      <Total e1={part1.exercises} e2={part2.exercises} e3={part3.exercises}/>
    </div>
  )
}

export default App