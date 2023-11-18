import React, { useState } from 'react';
import { BiChat, BiChevronLeft, BiChevronRight, BiCoinStack, BiHome, BiPin } from "react-icons/bi";

const SideNav = () => {

  const [toggleBar, setToggleBar] = useState(false)
  const toggleHandler =()=> {
    setToggleBar(!toggleBar)
  }

  const span = 'flex items-center text-black text-xl justify-start p-4 h-[60px] cursor-pointer hover:bg-[lightgrey] w-[100%]';
  const anchor = `ml-2 ${toggleBar && 'hidden md:hidden'} md:block`
  const icon = `${toggleBar && 'w-[100%] self-start'}`
  const chevron = 'absolute cursor-pointer text-2xl h-[60px] right-[-15px] top-0 bg-[white] hover:text-[grey] z-[99] hidden md:block'
  return (
    <nav className={`flex relative ${toggleBar ? 'sidebar' : 'sidebar_close'} w-[20%] h-[100%] bg-white`}>
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
      <span className={span}>
        <BiCoinStack className={icon}/>
        <a className={anchor}>Stack</a>
      </span>
    </div>
   {toggleBar ? <BiChevronRight className={chevron}  onClick={toggleHandler}/> : <BiChevronLeft className={chevron}  onClick={toggleHandler}/>}
    </nav>
  )
}

export default SideNav

