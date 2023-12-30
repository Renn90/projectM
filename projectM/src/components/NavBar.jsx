import React from "react";
import logo from "../assets/images/logo.png";
import { BiBell, BiMenuAltRight, BiNotification, BiSearch } from "react-icons/bi";
import profileImage from '../assets/images/stor3.jpg'

const NavBar = ({sethideBar}) => {
  return (
    <div className="bg-white flex items-center justify-between">
      <div className="w-[100%]">
        <img src={logo} className="w-[55px] ml-2 p-2" />
      </div>
      <div className="flex justify-center items-center mr-2">
      <div className="text-2xl mx-2 text-[grey]" >
      <BiBell />
      </div>
      <div className="h-[30px] w-[30px] mx-2">
        <img src={profileImage} className="w-full h-full rounded-lg object-cover"/>
      </div>
      <div className="text-2xl flex mx-2 md:hidden cursor-pointer" onClick={()=> sethideBar(false)}>
      <BiMenuAltRight />
      </div>
      </div>
    </div>
  );
};

export default NavBar;
