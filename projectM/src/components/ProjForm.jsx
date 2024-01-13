import React, { useContext } from "react";
import {Context} from '../pages/Auth/UserContext'
import { BiX } from "react-icons/bi";
import { Form } from "react-router-dom";
import { AiOutlineExclamationCircle } from "react-icons/ai";

const ProjForm = ({ formOpen }) => {

  const closeHandler = () => {
    formOpen(false);
  };

  const user = useContext(Context)
  console.log(user.stack)

  const input =
    "bg-white/5 p-2 my-2 w-[97%] border-secondary text-xs bg-transparent outline-0 border border-1 rounded";
  const flex = "flex flex-col justify-between md:flex-row w-[100%]";
  const labelForm = "flex flex-col w-[100%]";

  return (
    <section className="absolute top-0 bg-white rounded p-4 flex justify-center items-center w-[100%] h-[100%] mb-[20%] md:mb-0">
      <div className="absolute inset-0 bg-[#0000008f] rounded h-[100%] w-full z-[9]  flex items-center justify-center cursor-pointer" />
      <Form method='post' className=" relative border-secondary border-[1px] z-[99] rounded bg-white p-5 w-[400px] flex flex-col justify-center">
        <p className="py-2">Fill this form to add a New project</p>
        <span>
          <label className="text-secondary">Name</label>
          <input
            type="text"
            placeholder="Enter the name of your project"
            className={input}
            name="projectName"
          />
        </span>
        <span>
          <label className="text-secondary">Description</label>
          <input
            type="text"
            placeholder="Project Description"
            className={`${input} py-8`}
            name="projectDesc"
          />
        </span>
        <div className={flex}>
          <span className={labelForm}>
            <label className="text-secondary">Git Link <span className="text-xs">(optional)</span></label>
            <input
              type="link"
              placeholder="Enter your Git link"
              name="git"
              className={input}
            />
          </span>
          <span className={labelForm}>
            <label className="text-secondary">Live Link <span className="text-xs">(optional)</span></label>
            <input
              type="link"
              placeholder="Enter your live link"
              name="liveLink"
              className={input}
            />
          </span>
        </div>
        <button
        type="submit"
          className="relative gradient bg-secondary text-white px-4 py-2 rounded w-[100%] disabled:opacity-10 disabled:cursor-none hover:bg-primary"
        >
          Save Project
        </button>
        <BiX
          className="absolute top-[-10px] right-[-10px] bg-secondary text-white rounded-full text-3xl cursor-pointer hover:bg-primary"
          onClick={closeHandler}
        />
      </Form>
    </section>
  );
};

export default ProjForm;

export const projectFormAction = async ({request})=> {
  const formData = await request.formData();
  const projectData = {
    projectName: formData.get('projectName'),
    description: formData.get('description'),
    git: formData.get('git'),
    liveLink: formData.get('liveLink'),
  }
  return null
}
