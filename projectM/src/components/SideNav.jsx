import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { BiArrowFromLeft, BiArrowFromRight, BiChat, BiCoinStack, BiHome, BiUser } from "react-icons/bi";

const SideNav = ({hideBar, sethideBar}) => {
  const [toggleBar, setToggleBar] = useState(false)
  const [screenSize, setScreenSize] = useState(null)
  const toggleHandler =()=> {
    setToggleBar(!toggleBar)
  }

  useEffect(()=>{
    const size =()=> {
      if (window.innerWidth <= 768) {
        setScreenSize(true)
      }else{
        setScreenSize(false)
      }
    }
    window.onresize = () => {
      size()
    };
    size()
  },[setScreenSize])

  const closeHandler =()=> {
    sethideBar(true)
  }

  const span = 'flex items-center text-black m-2 rounded-md text-xl justify-start p-4 h-[40px] mx-auto cursor-pointer hover:bg-grey w-[100%] overflow-hidden';
  //const anchor = `ml-2`
  const anchor = `ml-2 ${toggleBar ? 'hidden' : 'hidden md:block'}`
  const icon = `w-[40px]`

  return (
    <>
  { hideBar && screenSize ? <></> :
  <>
  <div className="absolute inset-0 z-[997] bg-[#0000008f] rounded h-[100%] w-full items-center justify-center cursor-pointer flex md:hidden" onClick={()=> sethideBar(true)}/>
    <nav className={`flex absolute z-[999] ${!hideBar && screenSize && 'slide-in'  } ${toggleBar ? 'sidebar' : 'sidebar_close'} w-[20%] h-[100%] bg-white top-0  md:relative`}>
    <div className='flex overflow-hidden flex-col mt-4 mx-2 justify-start items-start w-full'>
      <NavLink to='' className={({isActive}) => isActive ? `bg-grey ${span}` : `${span}` } onClick={closeHandler}>
        <BiHome className={icon}/>
        <NavLink to='' className={anchor}>Home</NavLink>
      </NavLink>
     <NavLink to='/chat' className={({isActive}) => isActive ? `bg-grey ${span}` : `${span}` } onClick={closeHandler}>
        <BiChat className={icon}/>
        <a className={anchor}>Chat</a>
      </NavLink>
      <NavLink to='/stack' className={({isActive}) => isActive ? `bg-grey ${span}` : `${span}` } onClick={closeHandler}>
        <BiCoinStack className={icon}/>
        <a className={anchor}>Stack</a>
      </NavLink>
     <NavLink to='/profile' className={({isActive}) => isActive ? `bg-grey ${span}` : `${span}` } onClick={closeHandler}>
        <BiUser className={icon}/>
        <a className={anchor}>Profile</a>
      </NavLink>
      <span className={`${span} mt-auto font-semibold mb-4`} onClick={screenSize ? closeHandler : toggleHandler }>
        {toggleBar ? <BiArrowFromLeft className={`${icon} text-2xl`}/> : <BiArrowFromRight className={`${icon} text-2xl`}/>}
        <a className={`${anchor} text-lg`}>Collapse</a>
      </span>
    </div>
    </nav>
    </>
    }
    </>
  )
}

export default SideNav

