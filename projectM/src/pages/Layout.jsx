import React, { useState } from "react";
import NavBar from "../components/NavBar";
import SideNav from "../components/SideNav";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const [hideBar, sethideBar] = useState(true);
  return (
    <>
      <NavBar sethideBar={sethideBar}/>
      <div className="flex h-[100%]">
        <SideNav hideBar={hideBar} sethideBar={sethideBar}/>
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
