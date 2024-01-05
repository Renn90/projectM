import React, { useContext, useState } from "react";
import { Context } from "../Auth/UserContext";
import { jwtDecode } from "jwt-decode";
import { sanityAPI, sanityToken } from "../Auth/AuthFunction";
import { Form, redirect } from "react-router-dom";

const ProfileForm = ({ showForm }) => {
  const user = useContext(Context);
  const [firstName, setFirstName] = useState(user.firstname);
  const [lastName, setlastName] = useState(user.lastname);
  const [nickName, setnickName] = useState(user.nickname ? user.nickname : '');
  const [jobName, setjobName] = useState(user.job ? user.job : '');
  const [gitlink, setgitlink] = useState( user.gitLink ? user.gitLink : '');
  const [profilelink, setprofilelink] = useState(user.profileLink ? user.profileLink : '');

  // function to upfate the old user input
  function HandlefirstName(e) {
    setFirstName(e.target.value);
  }
  function HandlelastName(e) {
    setlastName(e.target.value);
  }
  function HandlenickName(e) {
    setnickName(e.target.value);
  }
  function Handlejob(e) {
    setjobName(e.target.value);
  }
  function Handlegit(e) {
    setgitlink(e.target.value);
  }
  function Handleprof(e) {
    setprofilelink(e.target.value);
  }
  const input =
    "bg-white/5 p-2 mb-2 w-[100%] border-secondary text-xs bg-transparent outline-0 border border-1 rounded";
  const fetchedcartegory = ["html", "css", "javascript"];

  return (
    <>
      <div className="absolute inset-0 z-[99] bg-[#0000008f] rounded h-[100%] transition w-full items-center justify-center cursor-pointer md:hidden" />
      <div className="w-[95%] absolute mx-auto top-4 z-[99] flex flex-col md:relative md:w-[60%] md:top-0 md:mt-[-70px]">
        <Form
        method="post"
        action="/profile"
          className={`relative border-grey border-[1px] rounded mx-auto bg-white p-8 w-full h-[550px] flex flex-col overflow-x-hidden overflow-y-scroll ${
            showForm && "transition"
          } md:h-full`}
        >
          <p className="text-sm font-semibold pb-2 opacity-60">
            Please ensure the information filled is correct
          </p>
          {/* input for personal informations*/}
          <h3 className="text-sm py-1 font-bold opacity-60">Info:</h3>
          <div className="flex flex-col md:flex-row">
            <span className="w-full mr-1">
              <label className="text-secondary">First Name</label>
              <input
                type="text"
                placeholder="Enter your first name"
                className={input}
                value={firstName}
                onChange={HandlefirstName}
                name="firstname"
              />
            </span>
            <span className="w-full mr-1">
              <label className="text-secondary">Last Name</label>
              <input
                type="text"
                placeholder="Enter your last name"
                className={input}
                value={lastName}
                onChange={HandlelastName}
                name="lastname"
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
                onChange={HandlenickName}
                value={nickName}
                name="nickname"
              />
            </span>
            <span className="w-full mr-1">
              <label className="text-secondary">Select a stack</label>
              <select className={`${input} w-full `}>
                {fetchedcartegory.map((cartegory) => (
                  <option
                    key={cartegory}
                    value={cartegory}
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
              onChange={Handlejob}
              value={jobName}
              name="jobtitle"
            />
          </span>
          {/* input for links i.e  portfolio and git*/}
          <h3 className="text-sm py-1 font-bold opacity-60">Links:</h3>
          <div className="flex flex-col md:flex-row">
            <span className="w-full mr-1">
              <label className="text-secondary">Git Link</label>
              <input
                type="url"
                placeholder="Enter your git link"
                className={input}
                onChange={Handlegit}
                value={gitlink}
                name="gitlink"
              />
            </span>
            <span className="w-full mr-1">
              <label className="text-secondary">Portfolio Link</label>
              <input
                type="url"
                placeholder="Enter your git link"
                className={input}
                onChange={Handleprof}
                value={profilelink}
                name="portfolio"
              />
            </span>
          </div>
          <button className="relative gradient bg-secondary text-white px-4 py-2 mt-2 rounded w-[100%] disabled:opacity-10 disabled:cursor-none hover:bg-primary">
            Update
          </button>
        </Form>
      </div>
    </>
  );
};

export default ProfileForm;

export const profileFormAction = ({ request }) => {

   function editUser() {
    const token = window.localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      const uid = decoded.user_id
      const email = decoded.email
      return editUserInfo(uid, email)
    } else {
      return redirect("/Auth");
    }

    async function editUserInfo(uid, email){
      const data = await request.formData();
      const editedInfo = {
        firstname: data.get("firstname"),
        lastname: data.get("lastname"),
        email: email,
        nickname: data.get("nickname"),
        job: data.get("jobtitle"),
        gitLink: data.get("gitlink"),
        portfolioLink: data.get("portfolio"),
      };
      const mutations = [{
        createOrReplace: {
               _id: uid,
               _type: 'user',
               ...editedInfo
        }
      }];
      try {
        console.log('start')
      const response = await fetch(`${sanityAPI}`,
       {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sanityToken}`,
        },
      body: JSON.stringify({mutations}),
      })
      if(response.ok){
        return response;
      }else{
        return null
      }
      } catch (err) {
        console.log(err);
        return err
      }
    }
  }
  return editUser()
};
