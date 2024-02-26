import React, { useContext } from "react";
import { randomColorsArray } from "../StackModal";
import { Context } from "../../pages/Auth/UserContext";
import { sanityAPI, sanityToken } from "../../pages/Auth/AuthFunction";
import { BiMinus, BiPlus } from "react-icons/bi";

const AddStackModal = ({ project, closeModal, refetch }) => {
  const user = useContext(Context);
  const addStack = async (stack) => {
    try {
      const res = await fetch(sanityAPI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sanityToken}`,
        },
        body: JSON.stringify({
          mutations: [
            { 
              patch: {
                id: project._id,
                insert: {
                  before: "stack[0]",
                  items: [
                    {
                      _key: stack.name,
                      stackName: stack.name,
                      category: stack.category,
                    },
                  ],
                },
              },
            },
          ],
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to add stack to project");
      }
      closeModal(null)
      refetch()
      console.log(res);
      return "added";
    } catch (error) {
      console.log(error);
    }
  };

  const removeStack = async (stack) => {
    try {
      const res = await fetch(sanityAPI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sanityToken}`,
        },
        body: JSON.stringify({
          mutations: [
            {
              patch: {
                id: project._id,
                unset: [`stack[_key == "${stack._key}"]`],
              },
            },
          ],
        }),
      });
  
      if (!res.ok) {
        throw new Error("Failed to remove stack from project");
      }
      closeModal(null);
      refetch()
      console.log(res);
      return "removed";
    } catch (error) {
      console.log(error);
    }
  };
  

  const renderIcon = (tool) => {
    const isAdded = project.stack.some((item) => item.stackName === tool.name);
    return isAdded ? <BiMinus onClick={() => removeStack(tool)}/> : <BiPlus onClick={() => addStack(tool)}/>;
  };


  return (
    <dialog className="absolute bg-transparent top-0 rounded p-4 flex justify-center items-center w-[100%] h-[100%] mb-[20%] md:mb-0">
      <div
        className="absolute inset-0 bg-[#00000081] rounded h-[100%] w-full z-[9]  flex items-center justify-center cursor-pointer"
        onClick={() => closeModal(null)}
      />
      <div className="max-w-[400px] w-full m-0 z-[999] p-3 bg-white rounded-lg flex flex-col sm:m-0 sm:p-4">
        <h2 className="font-bold text-sm my-1">Add a stack to this project</h2>
        <p className="text-xs my-1">
          You only have access to your added stacks, add to your stacks to
          access
        </p>
        <div className="flex flex-col items-center max-h-[200px] p-2 overflow-y-scroll customBar">
          {user.stack.map((tool, index) => (
            <div key={index} className="w-full">
              <div className="flex text-start items-center justify-between w-full text-xl font-semibold border-[1px] border-[grey] rounded p-2 my-1 text-black cursor-pointer hover:opacity-75">
                <div className="flex items-center">
                  <span
                    style={{
                      backgroundColor:
                        randomColorsArray[
                          Math.floor(Math.random() * randomColorsArray.length)
                        ],
                    }}
                    className="mr-2 h-[5px] w-[5px] rounded-full"
                  ></span>
                  <span className="flex justify-between items-center">
                    <h2>{tool.name}</h2>
                   
                  </span>
                </div>
                <span>
                {renderIcon(tool)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </dialog>
  );
};

export default AddStackModal;
