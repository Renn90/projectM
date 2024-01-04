import React, { useState,useEffect } from "react";
import NavBar from "../components/NavBar";
import SideNav from "../components/SideNav";
import { Outlet } from "react-router-dom";
import UserContext from "./Auth/UserContext";

const Layout = () => {
  const [hideBar, sethideBar] = useState(true);
  const [screenSize, setScreenSize] = useState(true)

  useEffect(()=>{
    const handleResize = () => {
   setScreenSize(window.innerWidth <= 768);
 };

 window.addEventListener('resize', handleResize);

 // Initial check
 handleResize();

 return () => {
   window.removeEventListener('resize', handleResize);
 };
 },[])


  return (
    <UserContext>
      <NavBar sethideBar={sethideBar}/>
      <div className="flex h-[100%]">
       { !hideBar && screenSize && <SideNav hideBar={hideBar} sethideBar={sethideBar} screenSize={screenSize} />}
       { !screenSize && <SideNav hideBar={hideBar} sethideBar={sethideBar} screenSize={screenSize} />}
        <Outlet />
      </div>
    </UserContext>
  );
};

export default Layout;
