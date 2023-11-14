import React from 'react';
import { BiChat, BiHome, BiPin } from "react-icons/bi";

const SideNav = () => {
  const span = 'flex items-center text-black text-xl justify-start p-4 cursor-pointer hover:bg-[lightgrey] w-[100%]';
  const anchor = 'ml-2'
  return (
    <nav className='flex flex-col items-start bg-white h-[100vh] w-[20%]'>
      <span className={span}>
        <BiHome />
        <a className={anchor}>Home</a>
      </span>
      <span className={span}>
        <BiChat />
        <a className={anchor}>Chat&nbsp;Room</a>
      </span>
      <span className={span}>
        <BiPin />
        <a className={anchor}>Pinned</a>
      </span>
    </nav>
  )
}

export default SideNav

