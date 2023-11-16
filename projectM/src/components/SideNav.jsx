import React, { useState } from 'react';
import { BiChat, BiChevronLeft, BiChevronRight, BiHome, BiPin } from "react-icons/bi";

const SideNav = () => {

  const [toggleBar, setToggleBar] = useState(false)
  const toggleHandler =()=> {
    setToggleBar(!toggleBar)
  }

  const span = 'flex items-center text-black text-xl justify-start p-4 h-[60px] cursor-pointer hover:bg-[lightgrey] w-[100%]';
  const anchor = `ml-2 ${toggleBar && 'hidden'}`
  const icon = `${toggleBar && 'w-[100%]'}`
  const chevron = 'absolute cursor-pointer text-2xl h-[60px] right-[-20px] top-0 bg-[white] hover:text-[grey]'
  return (
    <nav className={`flex relative ${toggleBar ? 'sidebar' : 'sidebar_close'} h-[100vh] bg-white `}>
    <div className='flex overflow-hidden flex-col items-start w-full'>
      <span className={span}>
        <BiHome className={icon}/>
        <a className={anchor}>Home</a>
      </span>
      <span className={span}>
        <BiChat className={icon}/>
        <a className={anchor}>Chat&nbsp;Room</a>
      </span>
      <span className={span}>
        <BiPin className={icon}/>
        <a className={anchor}>Pinned</a>
      </span>
    </div>
   {toggleBar ? <BiChevronRight className={chevron}  onClick={toggleHandler}/> : <BiChevronLeft className={chevron}  onClick={toggleHandler}/>}
    </nav>
  )
}

export default SideNav

