import React, { useState } from "react";
import Frame from "../components/Frame";
import { BiLogoHtml5, BiLogoJavascript, BiPlus } from "react-icons/bi";
import StackModal from "../components/StackModal";

const Stack = () => {
  const [addStack, setAddStack] = useState(false)
  return (
    <section className="relative w-[100%] flex flex-col justify-center p-4 px-8">
      <h1 className="font-bold text-2xl pb-2">My Stack</h1>
      <Frame>
        <div className="m-4">
          <p className="m-4 text-[grey]">
            These are the stacks you have worked with, to make a stack available
            to a project; you have to add it to your stacks.
          </p>
          <div className="flex items-center flex-wrap m-4">
            <h4 className="flex items-center text-xl font-semibold border-[1px] border-grey rounded p-2 my-1 mr-2 text-black">
              <BiLogoHtml5 className="text-2xl mr-1" />
              Html/css
            </h4>
            <h4 className="flex items-center text-xl font-semibold border-[1px] border-grey rounded p-2 my-1 mr-2 text-black">
              <BiLogoJavascript className="text-2xl mr-1" />
              Javascript
            </h4>
          </div>
          <button
        //   disabled={loading || !validForm ? true : false}
          className="relative flex items-center mx-4 font-semibold bg-secondary text-white px-4 py-2 mt-2 rounded disabled:opacity-10 disabled:cursor-none hover:bg-primary"
           onClick={()=> setAddStack(true)}
        >
          <BiPlus className="mx-1 font-bold text-xl"/>
          Add a new stack
        </button>
        </div>
       {addStack && <StackModal addStack={()=>setAddStack()}/>}
      </Frame>
    </section>
  );
};

export default Stack;
