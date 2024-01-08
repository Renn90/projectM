import React from "react";
import { BiLogoHtml5, BiLogoJavascript, BiPlus } from "react-icons/bi";
import { BiX } from "react-icons/bi";
import { techStacks } from "../stackData";

const StackModal = ({ addStack }) => {
  const closeHandler = () => {
    addStack(true);
  };

  // setting each cartegory
  const stack = {
    webFrameworks: techStacks.web_frameworks,
    backendframeworks: techStacks.backend_frameworks,
    mobile_frameworks: techStacks.mobile_frameworks,
    programming_languages: techStacks.programming_languages,
    database: techStacks.databases,
    version_control : techStacks.version_control,
    cloud_providers : techStacks.cloud_providers,
    devops_tools: techStacks.devops_tools,
  };

  return (
    <div className="absolute top-0 bg-white rounded p-4 flex justify-center items-center w-[100%] h-[100%] mb-[20%] md:mb-0">
      <div className="absolute inset-0 bg-[#0000008f] rounded h-[100%] w-full z-[9]  flex items-center justify-center cursor-pointer" />
      <div className="bg-white z-[999] w-[40%] p-4 rounded relative">
        <div>
          <h1 className="text-lg">Select a new stack.</h1>
          <select className="w-full bg-[#d1d1d1] outline-none p-2 text-black">
            <option value={'programming_languages'}>Promgramming Languages</option>
            <option value={'webFrameworks'}>Web Frameworks</option>
            <option value={'backendframeworks'}>Backend Framework</option>
            <option value={'mobile_frameworks'}>Mobile Framework</option>
            <option value={'database'}>Database</option>
            <option value={'devops_tools'}>Devops Tools</option>
            <option value={'cloud_providers'}>Cloude Providers</option>
            <option value={'version_control'}>Version Control</option>
          </select>
        </div>
        <div>
          <div className="flex flex-col items-center flex-wrap my-2  p-2 overflow-y-scroll">
            <h4 className="flex items-center w-full text-xl font-semibold border-[1px] border-grey rounded p-2 my-1 text-black">
              Html/css
            </h4>
            <h4 className="flex items-center w-full text-xl font-semibold border-[1px] border-grey rounded p-2 my-1 text-black">
              Javascript
            </h4>
            <BiX
              className="absolute top-[-10px] right-[-10px] bg-secondary text-white rounded-full text-3xl cursor-pointer hover:bg-primary"
              onClick={closeHandler}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StackModal;
