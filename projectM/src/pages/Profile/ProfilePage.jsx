import React, { useState } from "react";
import {
  BiCamera,
  BiEdit,
  BiLinkExternal,
  BiLogoGit,
  BiLogoHtml5,
  BiLogoJavascript,
} from "react-icons/bi";
import Frame from "../../components/Frame";
import cover from "../../assets/images/storage.jpg";
import profileImg from "../../assets/images/stor3.jpg";
import ProfileForm from "./ProfileForm";

const ProfilePage = () => {
  const links = {
    git: "githublink.com",
    profLink: "portfolio.johndoe.com",
  };

  const [showForm, setShowForm] = useState(false);

  return (
    <section className="w-[100%] p-4 rounded md:px-8">
      <Frame>
        <img
          alt="cover image"
          src={cover}
          className="relative w-[100%] h-[150px] object-cover rounded-t opacity-80 z-[9]"
        />
        <div className="flex items-start justify-around">
          <div
            className={`relative flex flex-col items-start w-[80%] bg-white ${
              showForm ? "md:w-[30%]" : "md:w-[50%]"
            } mx-auto p-8 rounded mt-[-70px] z-[99] border-[1px] border-grey`}
          >
            <div className="flex flex-col mb-2">
              <span className="relative w-[90px] h-[90px]">
                <img
                  alt="profile image"
                  src={profileImg}
                  className="h-full w-full object-cover rounded-full cursor-pointer"
                />
                <BiCamera className="bg-secondary p-2 rounded-full text-3xl text-white absolute bottom-0 right-0 cursor-pointer" />
              </span>
              <h2 className="font-bold pt-1">John Doe</h2>
              <p className="text-[grey]">heckton</p>
              <p className="text-sm">Frontend Developer</p>
            </div>
            <div className="p-3 my-2 border-[1px] border-grey rounded">
              <p className="text-sm py-1 font-bold opacity-70">Links:</p>
              <span className="flex flex-col">
                <a
                  className="flex items-center text-secondary underline"
                  href="/"
                >
                  <BiLogoGit className="mr-1 text-lg no-underline" />
                  {links.git.slice(0, 4)}...
                </a>
                <a
                  className="flex items-center text-secondary underline"
                  href="/"
                >
                  <BiLinkExternal className="mr-1 text-lg no-underline" />
                  {links.profLink.slice(0, 4)}...
                </a>
              </span>
            </div>
            <div>
              <p className="font-bold text-sm opacity-70 my-1">My Stack</p>
              <div className="flex items-center flex-wrap">
                <h4 className="flex items-center font-semibold border-[1px] border-grey rounded p-1 my-1 mr-2 text-secondary">
                  <BiLogoHtml5 className="text-xl mr-1" />
                  Html/css
                </h4>
                <h4 className="flex items-center font-semibold border-[1px] border-grey rounded p-1 my-1 mr-2 text-secondary">
                  <BiLogoJavascript className="text-xl mr-1" />
                  Javascript
                </h4>
              </div>
              <button
                disabled={showForm ? true : false}
                className="relative gradient bg-secondary text-white px-4 py-2 mt-2 rounded disabled:opacity-10 disabled:cursor-none hover:bg-primary"
                onClick={()=>setShowForm(true)}
              >
                <BiEdit />
              </button>
            </div>
          </div>
          {showForm && <ProfileForm showForm={showForm}/>}
        </div>
      </Frame>
    </section>
  );
};

export default ProfilePage;
