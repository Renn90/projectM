import React, { useContext, useEffect, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { FaUser } from "react-icons/fa6";
import imageUrlBuilder from "@sanity/image-url";
import ProjForm from "../components/ProjForm";
import Frame from "../components/Frame";
import { useNavigation } from "react-router-dom";
import Loader from "../components/UI/Loader";
import { client } from "../client";
import { Context } from "./Auth/UserContext";
import { sanityToken } from "./Auth/AuthFunction";

const HomePage = () => {
  const [openForm, setOpenForm] = useState(false);
  const [projects, setProjects] = useState([]);
  const [imageUrl, setImageUrl] = useState(null);
  const navigation = useNavigation();
  const loading = navigation.state == "loading";
  const user = useContext(Context);
  const userId = user._id;

  useEffect(() => {
    async function fetchUser() {
      const userQuery = `*[_type == "project" && members[user._ref == "${userId}"]] {
        _id,
        _createdAt,
        name,
        members[]{
          user->,
          role
        },
      }
      `;

      try {
        const response = await client.fetch(userQuery, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${sanityToken}`,
            "Content-Type": "application/json",
          },
        });
        setProjects(response);
        console.log(response[0]);
      } catch (err) {
        console.log(err);
      }
    }
    fetchUser();
  }, []);

  useEffect(() => {
    if (user.image && user.image.asset) {
      const builder = imageUrlBuilder(client);
      const imageUrl = builder.image(user.image).url();
      setImageUrl(imageUrl);
    }
  }, []);

  const getDate = (date) => {
    const creationDate = new Date(`${date}`);
    const day = creationDate.getDate();
    const month = creationDate.toLocaleString("en-US", { month: "long" });
    const year = creationDate.getFullYear();
    return `${day} ${month}, ${year}`;
  };

  return (
    <section className="relative w-[100%] flex flex-col justify-center p-4 px-8">
      <h1 className="font-bold text-2xl pb-2">Project Dashboard</h1>
      <Frame>
        <div className="flex h-full w-full flex-col">
          <div className="m-3 mb-0 bg-[#fafbfb] rounded shadow-sm">
            <div className="p-4">
              <h2 className="font-semibold text-sm font-serif italic">
                Hi, <span className="text-2xl">{user.firstname}</span>
              </h2>
              <i className="text-sm py-1">
                Collaborate & share: <br className="md:hidden flex" />
                Bring your projects together...
              </i>
            </div>
          </div>
          <div
            className={`bg-[#fafbfb] shadow-sm rounded m-3 h-[100%]  flex flex-col ${
              projects.length <= 0 && "justify-center"
            }`}
          >
            {projects.length <= 0 ? (
              <div className="flex flex-col items-center">
                <p className="text-xl px-4 text-center sm:text-2xl">
                  You have no added projects
                </p>
                <BiPlus
                  className="my-3 text-white bg-secondary p-2 rounded-full text-[50px] cursor-pointer hover:bg-primary"
                  onClick={() => setOpenForm(true)}
                />
              </div>
            ) : (
              <div className="flex mx-2 my-4">
                {projects.map((project) => (
                  <div className="rounded p-2 mr-4 bg-grey w-[200px] h-full">
                    <i className="text-[9px] font-semibold">
                      {getDate(project._createdAt)}
                    </i>
                    <div>
                      <h2 className="font-semibold text-lg">
                        {project.name[0].toUpperCase() + project.name.slice(1)}
                      </h2>
                    </div>
                    <div className="flex">
                      {project.members.map((member) => (
                        <div className="mr-[-7px]">
                          {member.user.image && member.user.image.asset ? (
                            <div className="mt-4 border-white border-[2px] shadow-md rounded-full h-[25px] w-[25px]">
                              <img
                                src={imageUrl}
                                className="h-full w-full object-cover shadow-md rounded-full cursor-pointer"
                              />
                            </div>
                          ) : (
                            <div className="bg-white mt-4 shadow-md rounded-full h-[25px] w-[25px]">
                              <FaUser className="m-auto text-[grey] h-full w-[40%]" />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    {project.members.map((member) => (member.user._id === user._id && <p className="text-sm font-semibold">{member.role}</p>))}
                  </div>
                ))}
              </div>
            )}
          </div>
          {openForm && <ProjForm formOpen={setOpenForm} />}
        </div>
      </Frame>
      {loading && <Loader />}
    </section>
  );
};

export default HomePage;
