import React, {useContext} from "react";
import { Context } from "../Auth/UserContext";

const ProfileForm = ({showForm}) => {


  const user = useContext(Context);
  console.log(user);

  const input =
    "bg-white/5 p-2 mb-2 w-[100%] border-secondary text-xs bg-transparent outline-0 border border-1 rounded";
  const fetchedcartegory = ["html", "css", "javascript"];

  return (
    <>
     <div className="absolute inset-0 z-[99] bg-[#0000008f] rounded h-[100%] transition w-full items-center justify-center cursor-pointer md:hidden" />
    <div className="w-[95%] absolute mx-auto top-4 z-[99] flex flex-col md:relative md:w-[60%] md:top-0 md:mt-[-70px]">
      <form className={`relative border-grey border-[1px] rounded mx-auto bg-white p-8 w-full h-[550px] flex flex-col overflow-x-hidden overflow-y-scroll ${showForm && 'transition'} md:h-full`}>
      <p className="text-sm font-semibold pb-2 opacity-60">Please ensure the information filled is correct</p>
        {/* input for personal informations*/}
        <h3 className="text-sm py-1 font-bold opacity-60">Info:</h3>
        <div className="flex flex-col md:flex-row">
          <span className="w-full mr-1">
            <label className="text-secondary">First Name</label>
            <input
              type="text"
              placeholder="Enter your first name"
              className={input}
              value={user.firstname}
            />
          </span>
          <span className="w-full mr-1">
            <label className="text-secondary">Last Name</label>
            <input
              type="text"
              placeholder="Enter your last name"
              className={input}
              value={user.lastname}
            />
          </span>
        </div>
        <div className="flex flex-col md:flex-row">
          <span className="w-full mr-1">
            <label className="text-secondary">Nickname</label>
            <input
              type="text"
              placeholder="Enter a nickname"
              className={`${input}`}
            />
          </span>
          <span className="w-full mr-1">
            <label className="text-secondary">Select a stack</label>
            <select className={`${input} w-full `}>
              {fetchedcartegory.map((cartegory) => (
                <option
                  key={cartegory.id}
                  value={cartegory.id}
                  className="bg-white text-secondary"
                >
                  {cartegory.name}
                </option>
              ))}
            </select>
          </span>
        </div>
        <span className="w-full mr-1">
          <label className="text-secondary">Title</label>
          <input
            type="text"
            placeholder="Enter a job title (i.e software enginear)"
            className={`${input}`}
          />
        </span>
        {/* input for links i.e  portfolio and git*/}
        <h3 className="text-sm py-1 font-bold opacity-60">Links:</h3>
        <div className="flex flex-col md:flex-row">
          <span className="w-full mr-1">
            <label className="text-secondary">Git Link</label>
            <input
              type="link"
              placeholder="Enter your git link"
              className={input}
            />
          </span>
          <span className="w-full mr-1">
            <label className="text-secondary">Portfolio Link</label>
            <input
              type="link"
              placeholder="Enter your git link"
              className={input}
            />
          </span>
        </div>
        <button
        //   disabled={loading || !validForm ? true : false}
          className="relative gradient bg-secondary text-white px-4 py-2 mt-2 rounded w-[100%] disabled:opacity-10 disabled:cursor-none hover:bg-primary"
        >
          Update
        </button>
      </form>
    </div>
    </>
  );
};

export default ProfileForm;
