import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { BiArrowFromLeft, BiArrowFromRight, BiChat, BiCoinStack, BiHome, BiUser } from "react-icons/bi";

const SideNav = ({hideBar, sethideBar, screenSize}) => {
  const [toggleBar, setToggleBar] = useState(false)

  const toggleHandler =()=> {
    setToggleBar(!toggleBar)
  }

  const closeHandler =()=> {
    sethideBar(true)
  }

  const span = 'flex items-center text-black m-2 rounded-md text-xl justify-start p-4 h-[40px] mx-auto cursor-pointer hover:bg-grey w-[100%] overflow-hidden';
  //const anchor = `ml-2`
  const anchor = `ml-2 ${toggleBar ? 'hidden' : 'hidden md:block'}`
  const icon = `w-[40px]`

  return (
  <>
  <div className="absolute inset-0 z-[997] bg-[#0000008f] rounded h-[100%] w-full items-center justify-center cursor-pointer flex md:hidden" onClick={()=> sethideBar(true)}/>
    <nav className={`flex absolute z-[999] ${!hideBar && screenSize && 'slide-in'  } ${toggleBar ? 'sidebar' : 'sidebar_close'} w-[20%] h-[100%] bg-white top-0  md:relative`}>
    <div className='w-full flex overflow-hidden flex-col justify-start items-center'>
          <hr className="border-grey w-[100%] border-2px"/>
      <div className='mt-4 mx-2 px-2 flex overflow-hidden flex-col justify-start items-start w-full h-full'>
      <NavLink to='' className={({isActive}) => isActive ? `bg-grey ${span}` : `${span}` } onClick={closeHandler}>
        <BiHome className={icon}/>
        <p to='' className={anchor}>Home</p>
      </NavLink>
     <NavLink to='/chat' className={({isActive}) => isActive ? `bg-grey ${span}` : `${span}` } onClick={closeHandler}>
        <BiChat className={icon}/>
        <p className={anchor}>Chat</p>
      </NavLink>
      <NavLink to='/stack' className={({isActive}) => isActive ? `bg-grey ${span}` : `${span}` } onClick={closeHandler}>
        <BiCoinStack className={icon}/>
        <p className={anchor}>Stack</p>
      </NavLink>
     <NavLink to='/profile' className={({isActive}) => isActive ? `bg-grey ${span}` : `${span}` } onClick={closeHandler}>
        <BiUser className={icon}/>
        <p className={anchor}>Profile</p>
      </NavLink>
      <span className={`${span} mt-auto font-semibold mb-4`} onClick={screenSize ? closeHandler : toggleHandler }>
        {toggleBar && !screenSize ? <BiArrowFromLeft className={`${icon} text-2xl`}/> : <BiArrowFromRight className={`${icon} text-2xl`}/>}
        <p className={`${anchor} text-lg`}>Collapse</p>
      </span>
      </div>
    </div>
    </nav>
    </>
  )
}

export default SideNav

