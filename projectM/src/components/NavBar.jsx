import React, { useContext, useState, useEffect } from "react";
import logo from "../assets/images/logo.png";
import { Form, Link } from "react-router-dom";
import { BiMenuAltRight } from "react-icons/bi";
import { MdLogout } from "react-icons/md";
import { FaUser } from "react-icons/fa6";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "../client";
import { Context } from "../pages/Auth/UserContext";

const NavBar = ({sethideBar}) => {
  const [imageUrl, setImageUrl] = useState(null);
  
 const user = useContext(Context)
 useEffect(() => {
  if (user.image && user.image.asset) {
    const builder = imageUrlBuilder(client);
    const imageUrl = builder.image(user.image).url();
    setImageUrl(imageUrl);
  }
}, []);

  return (
    <div className="bg-white flex items-center justify-between">
      <div className="w-[100%]">
        <img src={logo} className="w-[55px] ml-2 p-2" />
      </div>
      <div className="flex justify-center items-center mr-2">
      <div className="h-[30px] w-[30px] mx-2">
        <Link to='/profile'>
       {user.image ? <img src={imageUrl} className="w-full h-full rounded-full border-[2px] border-grey object-cover cursor-pointer"/> : 
       <div className="bg-grey rounded-full h-[30px] w-[30px]">
        <FaUser className="m-auto text-[grey] h-full"/>
       </div>
       }
       </Link>
      </div>
      <Form action="/logout" method="post">
      <button className="text-2xl mx-2 text-[grey] hover:text-[lightgrey] cursor-pointer outline-none border-none flex items-center justify-center" >
      <MdLogout />
      </button>
      </Form>
      <div className="text-2xl flex mx-2 md:hidden cursor-pointer" onClick={()=> sethideBar(false)}>
      <BiMenuAltRight />
      </div>
      </div>
    </div>
  );
};

export default NavBar;
