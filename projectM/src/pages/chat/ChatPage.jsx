import React from "react";
import Frame from "../../components/Frame";
import { proj } from "./ChatHome";
import { useParams } from "react-router-dom";
import { BiSend, BiSolidSend } from "react-icons/bi";

const ChatPage = () => {
  const params = useParams();
  const projID = params.projectID;
  const project = proj.find((proj) => proj.id == projID);

  return (
    <div className="relative w-[100%] flex flex-col items-start p-4 px-8 h-[94%]">
      <Frame>
        <div className="p-4 flex flex-col h-full">
          <div className="border-b-[1px] w-full py-2">
            <h1 className="font-semibold">{project.name}</h1>
            <i className="text-[grey] text-xs">{project.devs} team members</i>
          </div>
          <div className="flex flex-col items-start w-full h-full my-4 p-2 overflow-y-scroll customBar slidebar">
            {project.chat.map((chat) => (
              <div
                className={`bg-grey my-4 p-3 rounded-md w-[90%] ${
                  chat.sender === "george"
                    ? "text-white self-end bg-secondary"
                    : "bg-grey self-start"
                } md:w-[60%]`}
              >
                <i
                  className={`text-xs ${
                    chat.sender === "george" ? "text-grey" : "text-secondary"
                  }`}
                >
                  {chat.sender !== "george" ? chat.sender : "Me"}
                </i>
                <p>{chat.message}</p>
              </div>
            ))}
          </div>
          <div className="w-full p-2 flex mt-auto items-center border-secondary border-[1px] rounded-md">
            <input type="text" placeholder="Message" className="w-full p-2 outline-0" />
            <span className="text-secondary text-3xl ">
              <BiSolidSend />
            </span>
          </div>
        </div>
      </Frame>
    </div>
  );
};

export default ChatPage;
