import React from 'react'

const Frame = (props) => {
  return (
    <div className="relative overflow-hidden bg-white h-[100%] w-[100%] rounded hight-grow">
      {props.children}
    </div>
  )
}

export default Frame
