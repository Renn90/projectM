import React, { useContext, useEffect, useState } from "react";
import { BiLink, BiLogoGit, BiPlus } from "react-icons/bi";
import { BiLinkExternal } from "react-icons/bi";
import { FaUser } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TbDots } from "react-icons/tb";
import imageUrlBuilder from "@sanity/image-url";
import ProjForm from "../components/ProjForm";
import Frame from "../components/Frame";
import { useNavigation } from "react-router-dom";
import Loader from "../components/UI/Loader";
import { client } from "../client";
import { Context } from "./Auth/UserContext";
import { sanityToken } from "./Auth/AuthFunction";
import DeleteModal from "../components/UI/DeleteModal";
import AddStackModal from "../components/UI/AddStackModal";


const HomePage = () => {
  const [openForm, setOpenForm] = useState(false);
  const [projects, setProjects] = useState([]);
  const [imageUrl, setImageUrl] = useState(null);
  const [showDelete, setShowDelete] = useState(null)
  const [showStackModal, setShowStackModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null)
  const [load, setLoad] = useState(false)
  const navigation = useNavigation();
  const loading = navigation.state == "loading";
  const user = useContext(Context);
  const userId = user._id;

  const openHandler =()=> {
    setOpenForm(true)
  }

  async function fetchUser() {
    const userQuery = `*[_type == "project" && members[user._ref == "${userId}"]] {
      _id,
      _createdAt,
      name,
      description,
      git,
      liveLink,
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
      setConfirmDelete(null)
    } catch (err) {
      console.log(err);
    }
  }
console.log(projects)
  useEffect(() => {
    fetchUser();
  }, [openForm]);

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

  const showDeleteHandler =(id)=> {
     setShowDelete(id)
  }

  const deleteHandler = async(id)=> {
    setLoad(true)
    try{
      const res = await client.delete(id, {
        headers: {
          Authorization: `Bearer ${sanityToken}`
        },
      })
      if(!res.ok){
        console.log(res)
      }
    fetchUser()
  }catch(error){
    console.log(error)
  }
  setLoad(false)
  }

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
            className={`bg-[#fafbfb] shadow-sm rounded m-3 h-[100%] overflow-y-scroll  flex flex-col ${
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
              <div className="mx-2 my-4 py-4">
              <p className="text-xs font-semibold text-[grey] mx-4">My projects</p>
              <div className="flex flex-col h-full sm:flex-row sm:flex-wrap
              ">
                {projects.map((project) => (
                  <div className="rounded flex flex-col justify-between max-h-[400px] p-3 m-4 bg-grey  basis-[100%] sm:basis-[40%] lg:basis-[20%]" key={project._id} onClick={()=>showDelete && setShowDelete(null)}>
                    <div className="flex justify-between items-center relative">
                    <i className="text-[9px] font-semibold">
                      {getDate(project._createdAt)}
                    </i>
                    <TbDots className="font-bold text-xl cursor-pointer hover:opacity-50" onClick={()=>showDeleteHandler(project._id)}/>
                    {showDelete === project._id && <div className="absolute right-0 top-[20px] cursor-pointer flex items-center shadow-md text-[red] text-xs bg-white rounded p-2" onClick={()=>setConfirmDelete(project._id)}>
                    <RiDeleteBin6Line/>
                    <p className="ml-1">delete</p>
                    </div>
                    }
                    </div>
                    <div>
                      <h2 className="font-semibold text-lg">
                        {project.name[0].toUpperCase() + project.name.slice(1)}
                      </h2>
                      <p className="text-xs text-[grey] my-2">{project.description}</p>
                    </div>
                    <div className="ml-auto mb-2">
                      <button className="flex items-center text-[9px] border-[1px] border-black p-1 px-2 font-bold rounded-md hover:opacity-70" onClick={()=> setShowStackModal(true)}>
                     Add Stack <BiPlus className="ml-1"/> 
                      </button>  
                      {showStackModal && <AddStackModal project={project._id} />}
                    </div>
                    <hr className="border-[lightgrey] w-full border-[px] my-1"/>
                    <span className="flex">
                    {project.git && <a href={project.git}>
                    <BiLogoGit className="text-xl m-1 opacity-70 hover:opacity-50"/>
                    </a>}
                   {project.liveLink && <a href={project.liveLink}>
                    <BiLinkExternal  className="text-xl m-1 opacity-70 hover:opacity-50"/>
                    </a>}
                    </span>
                    <hr className="border-[lightgrey] w-full border-[px] my-1"/>
                    <div className="flex items-center justify-between">
                    <div className="flex">
                      {project.members.map((member) => (
                        <div className="mr-[-7px]" key={member.user._id}>
                          {member.user.image && member.user.image.asset ? (
                            <div className="border-white border-[2px] shadow-md rounded-full h-[25px] w-[25px]">
                              <img
                                src={imageUrl}
                                className="h-full w-full object-cover shadow-md rounded-full cursor-pointer"
                              />
                            </div>
                          ) : (
                            <div className="bg-white shadow-md rounded-full h-[25px] w-[25px]">
                              <FaUser className="m-auto text-[grey] h-full w-[40%]" />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    {project.members.map((member) => (member.user._id === user._id && <p key={member.user._id} className={`text-xs ${member.role === 'Owner' ?  'text-[red]' : 'text-[green]'} font-semibold`}>{member.role}</p>))}
                    </div>
                  </div>
                ))}
                <div className="rounded flex flex-col justify-center max-h-[400px] p-3 m-4 bg-grey items-center border-[2px] cursor-pointer border-[lightgrey] text-[grey] border-dashed hover:opacity-70 basis-[100%] sm:basis-[40%] lg:basis-[20%]" onClick={openHandler}><BiPlus className="text-2xl"/>
                <p>New Project</p>
                </div>
              </div>
              </div>
            )}
          </div>
          {confirmDelete && <DeleteModal deleteFunc={deleteHandler} id={confirmDelete} setid={setConfirmDelete}/>}
          {openForm && <ProjForm formOpen={setOpenForm} /> }
        </div>
      </Frame>
      {loading && <Loader />}
      {load && <Loader />}
    </section>
  );
};

export default HomePage;
