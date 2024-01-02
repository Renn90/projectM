import React, {useState} from "react";
import { BiPlus } from "react-icons/bi";
import ProjForm from "../components/ProjForm";
import Frame from "../components/Frame";

const HomePage = () => {
  const [openForm, setOpenForm] = useState(false)
  const proj = [
    //    {
    //   name: "To-do list",
    //   github: "hhhd/kdkkdddd/dkdkkd",
    //   stacks: [],
    //   link: "sfvgretgt/th/ethtyehty/hyhy",
    // }, 
  ];
  return (
    <section className="relative w-[100%] flex flex-col justify-center p-4 px-8">
      <h1 className="font-bold text-2xl pb-2">Project Dashboard</h1>
      <Frame>
      {proj.length <= 0 ? (
        <div className="w-[100%] h-[100%] flex flex-col justify-center items-center mb-[50%] md:mb-0">
          <p className="text-xl px-4 text-center sm:text-2xl">You have no added projects</p>
          <BiPlus className="my-3 text-white bg-secondary p-2 rounded-full text-[50px] cursor-pointer hover:bg-primary" onClick={()=>setOpenForm(true)}/>
        </div>
      ) : (
        <div></div>
      )}
            {openForm && <ProjForm formOpen={setOpenForm}/>}
      </Frame>
    </section>
  );
};

export default HomePage;
