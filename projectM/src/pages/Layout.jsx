import React from "react";
import NavBar from "../components/NavBar";
import SideNav from "../components/SideNav";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <NavBar />
      <div className="flex">
        <SideNav />
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
