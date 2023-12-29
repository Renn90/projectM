import React from 'react'
import { BiLogoHtml5, BiLogoJavascript, BiPlus } from "react-icons/bi";
import { BiX } from "react-icons/bi";

const StackModal = ({addStack}) => {
    const closeHandler =()=> {
        addStack(true)
    }
  return (
    <div className="absolute top-0 bg-white rounded p-4 flex justify-center items-center w-[100%] h-[100%] mb-[20%] md:mb-0">
        <div className="absolute inset-0 bg-[#0000008f] rounded h-[100%] w-full z-[9]  flex items-center justify-center cursor-pointer" />
        <div className='bg-white z-[999] w-[40%] p-4 rounded relative'>
            <h1 className='text-lg'>Select a new stack.</h1>
            <div>
            <div className="flex flex-col items-center flex-wrap my-2  p-2 overflow-y-scroll">
            <h4 className="flex items-center w-full text-xl font-semibold border-[1px] border-grey rounded p-2 my-1 text-black">
              <BiLogoHtml5 className="text-2xl mr-1" />
              Html/css
            </h4>
            <h4 className="flex items-center w-full text-xl font-semibold border-[1px] border-grey rounded p-2 my-1 text-black">
              <BiLogoJavascript className="text-2xl mr-1" />
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
  )
}

export default StackModal
