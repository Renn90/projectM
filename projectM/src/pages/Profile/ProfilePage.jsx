import React, { useContext, useEffect, useRef, useState } from "react";
import { FaUser } from "react-icons/fa6";
import {
  BiCamera,
  BiEdit,
  BiLinkExternal,
  BiLogoGit,
} from "react-icons/bi";
import Frame from "../../components/Frame";
import cover from "../../assets/images/storage.jpg";
import imageUrlBuilder from '@sanity/image-url';
import { Link, useNavigation } from "react-router-dom";
import ProfileForm from "./ProfileForm";
import { Context } from "../Auth/UserContext";
import { useActionData } from "react-router-dom";
import Loader from "../../components/UI/Loader";
import { randomColorsArray } from "../../components/StackModal";
import { sanityAPI, sanityToken } from "../Auth/AuthFunction";
import { client } from "../../client";

const ProfilePage = () => {
  const user = useContext(Context);
  const action = useActionData();

  const [showForm, setShowForm] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (action) {
      setShowForm(false);
    }
  }, [action]);

  const navigationState = useNavigation();
  const loading =
    navigationState.state === "submitting" || navigationState === "loading";

  const hiddenFileInput = useRef(null);

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    const formData = new FormData()
    formData.append('image', fileUploaded);
    const mutations = [{
      createOrReplace: {
        ...user,
        image: formData,
      }
    }]
    const sendImage = async ()=> {
       const response = await fetch(sanityAPI, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sanityToken}`,
        },
        body: { mutations },
       })
       console.log(response)
    }
    sendImage()
  };
  useEffect(()=>{
    if(user.image.asset){
      const builder = imageUrlBuilder(client);
      const imageUrl = builder.image(user.image).url();
      setImageUrl(imageUrl)
    }
  },[])


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
            className={`relative flex pb-2 flex-col items-start w-[80%] bg-white ${
              showForm ? "md:w-[40%]" : "md:w-[80%] lg:w-[60%]"
            } mx-auto p-8 rounded mt-[-80px] z-[99] border-[1px] border-grey`}
          >
            <div className="flex flex-col mb-2">
              <span className="relative w-[90px] h-[90px]">
                {user.image.asset ? (
                  <img
                    src={imageUrl}
                    className="h-full w-full object-cover rounded-full cursor-pointer"
                  />
                ) : (
                  <div className="bg-grey rounded-full h-[90px] w-[90px]">
                    <FaUser className="m-auto text-[grey] h-full w-[40%]" />
                  </div>
                )}
                <span
                  className="absolute bottom-0 right-0 cursor-pointer"
                >
                  <BiCamera onClick={handleClick} className="bg-secondary p-2 rounded-full text-3xl text-white hover:opacity-70" />
                  <input
                    type="file"
                    ref={hiddenFileInput}
                    onChange={handleChange}
                    accept="image/*"
                    style={{ display: "none" }}
                  />
                </span>
              </span>
              <h2 className="font-bold pt-1">
                {user.firstname.toUpperCase()} {user.lastname.toUpperCase()}
              </h2>
              <p className="text-[grey]">{user.nickname}</p>
              <p className="text-sm">{user.job}</p>
            </div>
            <div className="p-3 mb-2 border-[1px] border-grey rounded">
              <p className="text-sm py-1 font-bold opacity-70">Links:</p>
              {user.gitLink || user.profilelink ? (
                <span className="flex flex-col">
                  {user.gitLink && (
                    <a
                      className="flex items-center text-sm text-secondary underline"
                      href={user.gitLink}
                    >
                      <BiLogoGit className="mr-1 text-lg no-underline" />
                      {user.gitLink.slice(0, 19)}
                      {user.portfolioLink.length > 20 && "..."}
                    </a>
                  )}
                  {user.portfolioLink && (
                    <a
                      className="flex items-center text-sm text-secondary underline"
                      href={user.portfolioLink}
                    >
                      <BiLinkExternal className="mr-1 text-lg no-underline" />
                      {user.portfolioLink.slice(0, 19)}
                      {user.portfolioLink.length > 20 && "..."}
                    </a>
                  )}
                </span>
              ) : (
                <div className="text-[grey] text-xs">
                  <p>
                    {
                      "Your git and portfolio link will appear here when added ;)"
                    }
                  </p>
                </div>
              )}
            </div>
            {user.stack?.length > 0 ? (
              <div className="w-full">
                <p className="font-bold text-sm opacity-70 my-1">My Stack</p>
                <div
                  className={`flex items-center w-[100%] flex-wrap ${
                    user.stack.length > 3 && " h-[100px] overflow-y-scroll"
                  }`}
                >
                  {user.stack?.slice(0, 5).map((tool) => (
                    <h4
                      key={tool.name}
                      className="flex items-center px-2 font-semibold border-[1px] border-grey rounded p-1 my-[1px] mr-1 text-secondary"
                    >
                      <span
                        style={{
                          backgroundColor:
                            randomColorsArray[
                              Math.floor(
                                Math.random() * randomColorsArray.length
                              )
                            ],
                        }}
                        className="mr-2 h-[5px] w-[5px] rounded-full"
                      ></span>
                      {tool.name}
                    </h4>
                  ))}
                  {user.stack.length > 4 && (
                    <Link
                      to="/stack"
                      className="font-medium text-xs border-[1px] border-grey rounded p-1 my-1 text-secondary hover:border-secondary"
                    >
                      See more...
                    </Link>
                  )}
                </div>
              </div>
            ) : (
              <div className="p-3 my-2 text-sm border-[1px] border-grey rounded">
                <p className="text-[grey] text-xs mb-2">
                  You have no added stack?
                </p>
                <Link
                  to="/stack"
                  className="bg-secondary px-2 font-bold text-white text-center text-xs w-[70%] rounded p-1 cursor-pointer hover:opacity-70"
                >
                  Add a Stack
                </Link>
              </div>
            )}
            <button
              disabled={showForm ? true : false}
              className="relative gradient bg-secondary text-white px-4 py-2 my-2 rounded disabled:opacity-10 disabled:cursor-none hover:bg-primary"
              onClick={() => setShowForm(true)}
            >
              <BiEdit />
            </button>
          </div>
          {showForm && (
            <ProfileForm showForm={showForm} setShowForm={setShowForm} />
          )}
        </div>
      </Frame>
      {loading && <Loader />}
    </section>
  );
};

export default ProfilePage;
