import React from "react";
import Frame from "../../components/Frame";
import { Link } from "react-router-dom";

export const proj = [
  {
    name: "Cooking manual site",
    devs: "4",
    id: 1,
    chat: [
      {
        sender: 'kelvin',
        message: "How is the project going guys",
      },
      {
        sender: 'Kate',
        message: "its going great",
      },
      {
        sender: 'george',
        message: "Lets keep it up then..",
      },
      {
        sender: 'kelvin',
        message: "How is the project going guys",
      },
      {
        sender: 'Kate',
        message: "its going great",
      },
      {
        sender: 'george',
        message: "Lets keep it up then..",
      },
    ],
  },
  {
    name: "Agro-tech site",
    devs: "5",
    id: 2,
    chat: [
      {
        sender: 'kelvin',
        message: "How is the project going guys",
      },
      {
        sender: 'Kate',
        message: "its going great",
      },
      {
        sender: 'george',
        message: "Lets keep it up then..",
      },

    ],
  },
  {
    name: "Project manager site",
    devs: "8",
    id: 3,
    chat: [
      {
        sender: 'kelvin',
        message: "How is the project going guys",
      },
      {
        sender: 'Kate',
        message: "its going great",
      },
      {
        sender: 'george',
        message: "Lets keep it up then..",
      },
    ],
  },
];

const ChatHome = () => {
  return (
    <section className="relative w-[100%] flex flex-col justify-center p-4 px-8">
      <Frame>
        <div className="p-4 h-full overflow-y-scroll">
          {proj.map((proj) => (
            <Link to={`/chat/${proj.id}`}>
              <div className="my-4 pt-4 p-2 cursor-pointer rounded border-b-1 border-b-[1px] hover:bg-[lightgrey]">
                <h2 className="font-semibold">{proj.name}</h2>
                <i className="text-[grey] text-sm">{proj.devs} team members</i>
              </div>
            </Link>
          ))}
        </div>
      </Frame>
    </section>
  );
};

export default ChatHome;
