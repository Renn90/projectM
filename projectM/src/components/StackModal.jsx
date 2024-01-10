import React, { useContext, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { BiX } from "react-icons/bi";
import { techStacks } from "../stackData";
import { sanityAPI, sanityToken } from "../pages/Auth/AuthFunction";
import { Context } from "../pages/Auth/UserContext";
import Loader from "./UI/Loader";

const StackModal = ({ addStack }) => {
  const [cartegory, setCartegory] = useState("programming_languages");
  const [addStackTemp, setAddStackTemp] = useState([]);
  const [loading, setloading] = useState(false);

  const closeHandler = () => {
    addStack(false);
  };

  const slectedStack = techStacks[cartegory];

  const pickStack = (e) => {
    setCartegory(e.target.value);
    console.log(e.target.value);
  };

  const addStackHandler = (e) => {
    const constructKey = { ...e, _key: e.name };
    setAddStackTemp(() => [...addStackTemp, constructKey]);
  };
  console.log(addStackTemp);
  const removeTempHandler = (e) => {
    const removed = addStackTemp.filter((tool) => tool.name !== e);
    setAddStackTemp(removed);
  };

  const user = useContext(Context);
  const userid = user._id;

  async function saveStack() {
    try {
      setloading(true);
      const response = await fetch(sanityAPI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sanityToken}`,
        },
        body: JSON.stringify({
          mutations: [
            {
              patch: {
                id: userid,
                insert: {
                  after: "stack[-1]",
                  items: addStackTemp,
                },
              },
            },
          ],
        }),
      });
      if (!response.ok) {
        console.log(response);
      }
      setloading(false);
      setAddStackTemp([]);
      addStack(false);
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  const fullStack = (e) =>
    addStackTemp.find((tools) => tools.name === e) ||
    user.stack.find((tools) => tools.name === e)

  return (
    <div className="absolute top-0 bg-white rounded p-4 flex justify-center items-center w-[100%] h-[100%] mb-[20%] md:mb-0">
      <div
        className="absolute inset-0 bg-[#0000008f] rounded h-[100%] w-full z-[9]  flex items-center justify-center cursor-pointer"
        onClick={closeHandler}
      />
      <div className="bg-white z-[99] w-full p-4 rounded relative md:w-[40%]">
        <div>
          <h1 className="text-lg">Select a new stack.</h1>
          {addStackTemp.length > 0 && (
            <div className="flex items-center">
              <div className="flex flex-wrap rounded-lg w-full max-h-[80px] overflow-hidden overflow-y-scroll bg-grey slidebar p-2">
                {addStackTemp.map((tool, index) => (
                  <p
                    className="text-xs bg-white p-2 m-1 rounded relative"
                    key={index}
                  >
                    {tool.name}
                    <BiX
                      className="absolute top-[-6px] text-white right-[-8px] text-[15px] bg-[grey] rounded-full cursor-pointer"
                      onClick={() => removeTempHandler(tool.name)}
                    />
                  </p>
                ))}
              </div>
              <button
                className="bg-secondary p-2 text-white ml-2 text-xl h-[40px] w-[40px] font-semibold rounded hover:opacity-70"
                onClick={saveStack}
              >
                +
              </button>
            </div>
          )}
          <select
            className="w-full  bg-grey my-2 outline-none p-2 rounded text-black"
            value={cartegory}
            onChange={pickStack}
          >
            <option value={"programming_languages"}>
              Promgramming Languages
            </option>
            <option value={"markup_Styling"}>Markup & Styling</option>
            <option value={"web_frameworks"}>Web Frameworks</option>
            <option value={"backend_frameworks"}>Backend Framework</option>
            <option value={"mobile_frameworks"}>Mobile Framework</option>
            <option value={"databases"}>Databases</option>
            <option value={"devops_tools"}>Devops Tools</option>
            <option value={"cloud_providers"}>Cloude Providers</option>
            <option value={"version_control"}>Version Control</option>
          </select>
        </div>
        <div>
          <div className="flex flex-col items-center max-h-[200px] p-2 overflow-y-scroll">
            {slectedStack.map((tool, index) => (
              <div key={index} className="w-full">
                <h4 className="flex items-center justify-between w-full text-xl font-semibold border-[1px] border-[grey] rounded p-2 my-1 text-black">
                  {tool.name}
                  {!fullStack(tool.name) && (
                    <BiPlus
                      className="cursor-pointer hover:text-[grey]"
                      onClick={() => addStackHandler(tool)}
                    />
                  )}
                </h4>
              </div>
            ))}
            <BiX
              className="absolute top-[-10px] right-[-10px] bg-secondary text-white rounded-full text-3xl cursor-pointer hover:bg-primary"
              onClick={closeHandler}
            />
          </div>
        </div>
      </div>
      {loading && <Loader />}
    </div>
  );
};

export default StackModal;
