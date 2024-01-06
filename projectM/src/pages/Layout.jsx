import React, { useState,useEffect, useContext } from "react";
import NavBar from "../components/NavBar";
import SideNav from "../components/SideNav";
import { Outlet } from "react-router-dom";
import UserContext from "./Auth/UserContext";
import { sanityToken } from "./Auth/AuthFunction";
import { createClient } from "@sanity/client";
import { jwtDecode } from "jwt-decode";
import { redirect} from "react-router-dom";

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

 const expiration =()=> {
  const storedExpiration = localStorage.getItem('expiration')
  if(storedExpiration){
    const expirationDate = new Date(storedExpiration)
    const now = new Date();
    const duration = expirationDate.getTime() - now.getTime();
    return duration;
  }
}

const token = window.localStorage.getItem('token');

useEffect(()=>{
const duration = expiration()
console.log(duration)
 if(!token){
  return;
 }
 setTimeout(() => {
  redirect('/logout')
 }, duration);
},[token, expiration])


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

export const userLoader = async () => {
  const client = createClient({
    projectId: "jf3w5ozh",
    dataset: "production",
    useCdn: false
  })

  const token = window.localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      const uid = decoded.user_id
      return fetchUser(uid)
    } else {
      return redirect("/Auth");
    }
    async function fetchUser(uid){
      const userQuery = `*[_type == "user" && _id == "${uid}"]`;
      try {
        const response = await client.fetch(userQuery, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${sanityToken}`,
          },
        });
        
        const user = await response;
        return user[0];
      } catch (err) {
        console.log(err);
        return null
      }
    }
};


