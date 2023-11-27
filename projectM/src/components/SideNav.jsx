import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { BiArrowFromLeft, BiArrowFromRight, BiChat, BiCoinStack, BiHome, BiUser } from "react-icons/bi";

const SideNav = () => {

  const [toggleBar, setToggleBar] = useState(false)
  const toggleHandler =()=> {
    setToggleBar(!toggleBar)
  }

  const span = 'flex items-center text-black m-2 rounded-md text-xl justify-start p-4 h-[40px] mx-auto cursor-pointer hover:bg-grey w-[100%] overflow-hidden';
  const anchor = `ml-2 ${toggleBar ? 'hiddenLink' : 'showLinks'}`
  //const anchor = `ml-2 ${toggleBar ? 'hidden' : 'hidden md:block'}`
  const icon = `w-[40px]`

  return (
    <nav className={`flex relative ${toggleBar ? 'sidebar' : 'sidebar_close'} w-[20%] h-[100%] bg-white`}>
    <div className='flex overflow-hidden flex-col mt-4 mx-2 justify-start items-start w-full'>
      <NavLink to='' className={({isActive}) => isActive ? `bg-grey ${span}` : `${span}` }>
        <BiHome className={icon}/>
        <NavLink to='' className={anchor}>Home</NavLink>
      </NavLink>
     <NavLink to='/chat' className={({isActive}) => isActive ? `bg-grey ${span}` : `${span}` }>
        <BiChat className={icon}/>
        <a className={anchor}>Chat</a>
      </NavLink>
      <NavLink to='/stack' className={({isActive}) => isActive ? `bg-grey ${span}` : `${span}` }>
        <BiCoinStack className={icon}/>
        <a className={anchor}>Stack</a>
      </NavLink>
     <NavLink to='/profile' className={({isActive}) => isActive ? `bg-grey ${span}` : `${span}` }>
        <BiUser className={icon}/>
        <a className={anchor}>Profile</a>
      </NavLink>
      <span className={`${span} mt-auto font-semibold mb-4 hidden md:flex`} onClick={toggleHandler }>
        {toggleBar ? <BiArrowFromLeft className={`${icon} text-2xl`}/> : <BiArrowFromRight className={`${icon} text-2xl`}/>}
        <a className={`${anchor} text-lg`}>Collapse</a>
      </span>
    </div>
    </nav>
  )
}

export default SideNav

