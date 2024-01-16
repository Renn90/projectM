import React, { useContext, useEffect, useState } from "react";
import { BiPlus } from "react-icons/bi";
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
  const navigation = useNavigation();
  const loading = navigation.state == "loading";
  const user = useContext(Context);
  const userId = user._id;

  useEffect(() => {
    async function fetchUser() {
      const userQuery = `*[_type == "project" && members[user._ref == "${userId}"]] {
        ...
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
      } catch (err) {
        console.log(err);
      }
    }
    fetchUser();
  }, []);

  return (
    <section className="relative w-[100%] flex flex-col justify-center p-4 px-8">
      <h1 className="font-bold text-2xl pb-2">Project Dashboard</h1>
      <Frame>
        <div className="flex h-full w-full flex-col">
        <div className="m-3 mb-0 bg-grey rounded">
          <div className="p-4">
          <h2 className="font-semibold text-sm font-serif italic">Hi, <span className="text-2xl">{user.firstname}</span></h2>
          <i className="text-sm py-1">Collaborate & share: < br className="md:hidden flex"/>Bring your  projects together...</i>
          </div>
        </div>
        <div className="bg-grey rounded m-4 w-[100%] h-[100%]">
        {projects.length <= 0 ? (
          <div className=" flex flex-col  justify-center items-center">
            <p className="text-xl px-4 text-center sm:text-2xl">
              You have no added projects
            </p>
            <BiPlus
              className="my-3 text-white bg-secondary p-2 rounded-full text-[50px] cursor-pointer hover:bg-primary"
              onClick={() => setOpenForm(true)}
            />
          </div>
        ) : (
          <>
            {projects.map((project) => (
              <div className="">
              <div className="rounded bg-grey p-4 ">
                {project.name}
              </div>
              </div>
            ))}
          </> 
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
