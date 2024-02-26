import React, { useContext, useEffect, useState } from "react";
import { Context } from "../Auth/UserContext";
import { jwtDecode } from "jwt-decode";
import { sanityAPI, sanityToken } from "../Auth/AuthFunction";
import { Form, redirect, useNavigate,  } from "react-router-dom";
import { BiX } from "react-icons/bi";

const ProfileForm = ({ showForm, setShowForm }) => {
  const user = useContext(Context);
  const [firstName, setFirstName] = useState(user.firstname);
  const [lastName, setlastName] = useState(user.lastname);
  const [nickName, setnickName] = useState(user.nickname ? user.nickname : "");
  const [jobName, setjobName] = useState(user.job ? user.job : "");
  const [gitlink, setgitlink] = useState(user.gitLink ? user.gitLink : "");
  const [profilelink, setprofilelink] = useState(
    user.portfolioLink ? user.portfolioLink : ""
  );
  const [lengthError, setLengthError] = useState("");

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

  const closeHandler = () => {
    setShowForm(false);
  };

  useEffect(() => {
    if (firstName.length >= 15) {
      setLengthError("Firstname.");
    } else if (lastName.length >= 15) {
      setLengthError("Lastname");
    } else if (jobName.length >= 25) {
      setLengthError("Job title");
    } else if (nickName.length >= 14) {
      setLengthError("Nickname");
    } else {
      setLengthError("");
    }
  }, [firstName, lastName, jobName, nickName]);

  return (
    <>
      <div className="absolute inset-0 z-[99] bg-[#0000008f] rounded h-[100%] transition w-full items-center justify-center cursor-pointer md:hidden" />
      <div className="w-[95%] absolute mx-auto top-4 z-[99] flex flex-col md:relative md:w-[50%] md:top-0 md:mt-[-80px]">
        <Form
          method="post"
          action="/profile"
          className={`relative border-grey border-[1px] rounded mx-auto bg-white p-8 w-full h-[550px] flex flex-col overflow-x-hidden customBar overflow-y-scroll ${
            showForm && "transition"
          } md:h-full`}
        >
          <p className="text-sm font-semibold py-2 opacity-60">
            Please ensure the information filled is correct
          </p>
          {lengthError && (
            <p className="text-xs text-[red] font-semibold pb-2 opacity-60">
              You've reached the maximum character limit for {lengthError}
            </p>
          )}
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
                required
                maxLength={20}
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
                required
                name="lastname"
                maxLength={20}
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
                maxLength={15}
              />
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
              maxLength={25}
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
            <input
                value={JSON.stringify(user.stack)}
                name="userstack"
                hidden
                readOnly
              />
          </div>
          <button className="relative gradient bg-secondary text-white px-4 py-2 mt-2 rounded w-[100%] disabled:opacity-10 disabled:cursor-none hover:bg-primary">
            Update
          </button>
        </Form>
        <BiX
          className="absolute top-[-10px] right-[-10px] border-grey border-[1px] bg-secondary text-white rounded-full text-3xl cursor-pointer hover:bg-primary"
          onClick={closeHandler}
        />
      </div>
    </>
  );
};

export default ProfileForm;

export const profileFormAction = async ({ request }) => {

  function editUser() {
    const token = window.localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      const uid = decoded.user_id;
      const email = decoded.email;
      console.log(decoded)
      return editUserInfo(uid, email);
    } else {
      return redirect("/Auth");
    }

    async function editUserInfo(uid, email) {
      const data = await request.formData();
      try {
        const firstname = data.get("firstname");
        const lastname = data.get("lastname");
        const stack = data.get("userstack");
        console.log(JSON.parse(stack))
        if (firstname.length > 1 && lastname.length > 1) {
          const editedInfo = {
            firstname: firstname,
            lastname: lastname,
            email: email,
            stack: JSON.parse(stack),
            nickname: data.get("nickname"),
            job: data.get("jobtitle"),
            gitLink: data.get("gitlink"),
            portfolioLink: data.get("portfolio"),
          };
          const mutations = [
            {
              createOrReplace: {
                _id: uid,
                _type: "user",
                stack: stack,
                ...editedInfo,
              },
            },
          ];
          const response = await fetch(`${sanityAPI}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${sanityToken}`,
            },
            body: JSON.stringify({ mutations }),
          });
          if (response.ok) {
            return response;
          } else {
            return null;
          }
        } else {
          throw new Error("invalid input");
        }
      } catch (err) {
        console.log(err);
        return err;
      }
    }
  }
  return editUser();
};
