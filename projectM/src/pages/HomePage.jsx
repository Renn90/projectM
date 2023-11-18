import React, {useState} from "react";
import { BiPlus } from "react-icons/bi";
import ProjForm from "../components/ProjForm";

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
    <section className="relative w-[100%] flex flex-col justify-center">
      {" "}
      {proj.length <= 0 ? (
        <div className="w-[100%] flex flex-col justify-center items-center mb-[50%] md:mb-0">
          <p className="text-2xl px-4 text-center">You have no added projects</p>
          <BiPlus className="my-3 text-white bg-[blue] p-2 rounded-full text-[50px] cursor-pointer hover:bg-[lightblue]" onClick={()=>setOpenForm(true)}/>
        </div>
      ) : (
        <div></div>
      )}
      {openForm && <ProjForm formOpen={setOpenForm}/>}
    </section>
  );
};

export default HomePage;
