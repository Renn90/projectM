import React, { useState } from 'react';
import { BiArrowBack, BiArrowFromLeft, BiArrowFromRight, BiChat, BiChevronLeft, BiChevronRight, BiCoinStack, BiHome, BiPin, BiUser } from "react-icons/bi";

const SideNav = () => {

  const [toggleBar, setToggleBar] = useState(false)
  const toggleHandler =()=> {
    setToggleBar(!toggleBar)
  }

  const span = 'flex items-center text-black m-2 rounded-md text-xl justify-start p-4 h-[40px] mx-auto cursor-pointer hover:bg-[lightgrey] w-[100%]';
  const anchor = `ml-2 ${toggleBar && 'hidden md:hidden'} md:block`
  const icon = `${toggleBar && 'w-[100%]'}`
  const chevron = 'absolute cursor-pointer text-2xl h-[60px] right-[-15px] top-0 bg-[white] hover:text-[grey] z-[99] hidden md:block'
  return (
    <nav className={`flex relative ${toggleBar ? 'sidebar' : 'sidebar_close'} w-[20%] h-[100%] bg-white`}>
    <div className='flex overflow-hidden flex-col mt-4 mx-2 justify-start items-start w-full'>
      <span className={span}>
        <BiHome className={icon}/>
        <a className={anchor}>Home</a>
      </span>
      <span className={span}>
        <BiChat className={icon}/>
        <a className={anchor}>Chat&nbsp;Room</a>
      </span>
      <span className={span}>
        <BiCoinStack className={icon}/>
        <a className={anchor}>Stack</a>
      </span>
      <span className={span}>
        <BiUser className={icon}/>
        <a className={anchor}>Profile</a>
      </span>
      <span className={`${span} mt-auto font-semibold mb-4`} onClick={toggleHandler }>
        {toggleBar ? <BiArrowFromLeft className={`${icon} text-2xl`}/> : <BiArrowFromRight className={`${icon} text-2xl`}/>}
        <a className={`${anchor} text-lg`}>Collapse</a>
      </span>
    </div>
    </nav>
  )
}

export default SideNav

