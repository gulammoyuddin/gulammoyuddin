import { useState,forwardRef,useImperativeHandle } from 'react'
import propTypes from 'prop-types'
const Toggleelement=forwardRef ((props,ref) => {
  const [ visible,setVisible ]=useState(false)
  const hidewhenvisible={ display:visible?'none':'' }
  const showwhenvisible={ display:visible?'':'none' }
  const togglevisibility=() => {
    setVisible(!visible)
  }
  useImperativeHandle(ref,() => {
    return { togglevisibility }
  })
  return(
    <div>
      <div style={hidewhenvisible}>
        <button onClick={togglevisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showwhenvisible}>
        {props.children}
        <button onClick={togglevisibility}>cancel</button>
      </div>
    </div>
  )
})
Toggleelement.propTypes={
  buttonLabel:propTypes.string.isRequired
}
Toggleelement.displayName='Toggleelement'
export default Toggleelement