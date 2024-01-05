import React, { useContext } from "react";
import logo from "../assets/images/logo.png";
import { BiMenuAltRight } from "react-icons/bi";
import { MdLogout } from "react-icons/md";
import { FaUser } from "react-icons/fa6";
import profileImage from '../assets/images/stor3.jpg';
import { Context } from "../pages/Auth/UserContext";

const NavBar = ({sethideBar}) => {
  
 const user = useContext(Context)

  return (
    <div className="bg-white flex items-center justify-between">
      <div className="w-[100%]">
        <img src={logo} className="w-[55px] ml-2 p-2" />
      </div>
      <div className="flex justify-center items-center mr-2">
      <div className="h-[30px] w-[30px] mx-2">
       {user.profileImage ? <img src={profileImage} className="w-full h-full rounded-lg object-cover"/> : 
       <div className="bg-grey rounded-full h-[30px] w-[30px]">
        <FaUser className="m-auto text-[grey] h-full"/>
       </div>
       }
      </div>
      <div className="text-2xl mx-2 text-[grey]" >
      <MdLogout />
      </div>
      <div className="text-2xl flex mx-2 md:hidden cursor-pointer" onClick={()=> sethideBar(false)}>
      <BiMenuAltRight />
      </div>
      </div>
    </div>
  );
};

export default NavBar;
