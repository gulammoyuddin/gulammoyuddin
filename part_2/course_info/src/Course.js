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
        <h2>{props.course}</h2>
      </div>
    )
  }
  const Content =(props) =>{
   // console.log(props)
    const t =props.parts
    return (
      <div>
        {t.map((to)=><Part key={to.id} name={to.name} number={to.exercises}/>)}
      </div>
    )
  }
  const Total = (props) =>{
    const t =props.parts
    const l=t.reduce((sum,t)=>sum+t.exercises,0)
    return (
      <div>
        <h3> total of exercises {l}</h3>
      </div>
    )
  }
  const Course=({ course })=>{
    const part=course.parts 
    return (
      <div>
        <Header course={course.name}/>
        <Content parts={part}/>
        <Total parts={part}/>
      </div>
    )
  }
  export default Course