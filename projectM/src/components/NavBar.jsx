import React from "react";
import logo from "../assets/images/logo.png";
import { BiSearch } from "react-icons/bi";

const NavBar = () => {
  return (
    <div className="bg-white flex items-center justify-between">
      <div className="w-[100%]">
        <img src={logo} className="w-[50px] ml-2 p-2" />
        <hr />
      </div>
      <span className="flex items-center mr-[20px]">
        <BiSearch />
        <input type="search" className="border-[red]" placeholder="Search for a project"/>
      </span>
    </div>
  );
};

export default NavBar;
