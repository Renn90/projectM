import React, { useContext, useEffect, useState } from "react";
import Frame from "../components/Frame";
import { BiPlus } from "react-icons/bi";
import StackModal, { randomColorsArray } from "../components/StackModal";
import { useNavigation } from "react-router-dom";
import Loader from "../components/UI/Loader";
import { Context } from "./Auth/UserContext";

const Stack = () => {
  const user =  useContext(Context)
  const [addStack, setAddStack] = useState(false);
  const navigation = useNavigation();
  const loading = navigation.state == "loading";

  return (
    <section className="relative w-[100%] flex flex-col justify-center p-4 px-8">
      <h1 className="font-bold text-2xl pb-2">My Stack</h1>
      <Frame>
        <div className="m-4">
          {user.stack && user.stack.length > 0 ? (
            <>
              <p className="m-4 text-[grey]">
                These are the stacks you have worked with, <br/> to make a stack
                available to a project; you have to add it to your stacks.
              </p>
              <div className="flex items-center flex-wrap m-4 overflow-y-scroll max-h-[250px]">
               {user.stack?.map((stack)=>(
                <div  key={stack.name} className="flex items-center text-xl font-semibold border-[1px] border-grey rounded p-2 my-1 mr-2 text-black">
                <span
                style={{
                  backgroundColor:
                    randomColorsArray[Math.floor(Math.random() * randomColorsArray.length)],
                }}
                className="mr-2 h-[5px] w-[5px] rounded-full"
              ></span> 
               <h4 className="text-secondary text-lg">
                  {stack.name}
                </h4>
                </div>
                ))}
              </div>
            </>
          ) : (
            <div className="mx-4">
              <h1 className="font-bold text-lg text-[#292929] py-1">You do not have any stack added yet!</h1>
              <p className="text-sm py-1 pb-2">Add new stacks to make them available here and in your projects.</p>
            </div>
          )}
          <button
            className="relative flex items-center mx-4 font-semibold bg-secondary text-white px-4 py-2 mt-2 rounded disabled:opacity-10 disabled:cursor-none hover:bg-primary"
            onClick={() => setAddStack(true)}
          >
            <BiPlus className="mx-1 font-bold text-xl" />
            Add a new stack
          </button>
        </div>
        {addStack && <StackModal addStack={setAddStack} />}
      </Frame>
      {loading && <Loader />}
    </section>
  );
};

export default Stack;
