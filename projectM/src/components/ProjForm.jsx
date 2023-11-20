import React from "react";
import { BiX } from "react-icons/bi";

const ProjForm = ({formOpen}) => {
  const fetchedcartegory = ["html", "css", "javascript"];

  const closeHandler =()=> {
    formOpen(false)
  }

  const input =
    "bg-white/5 p-2 my-2 w-[97%] border-secondary text-xs bg-transparent outline-0 border border-1 rounded";
  const flex = "flex flex-col justify-between md:flex-row w-[100%]";
  const labelForm = "flex flex-col w-[100%]";

  return (
    <section className="absolute top-0 bg-white rounded p-4 flex justify-center items-center w-[100%] h-[100%] mb-[20%] md:mb-0">
      <form className="relative border-secondary border-[1px] rounded bg-white p-5 w-[400px] flex flex-col justify-center">
        <span>
          <label className="text-secondary">Name</label>
          <input
            type="text"
            placeholder="Enter the name of your project"
            className={input}
          />
        </span>
        <span>
          <label className="text-secondary">Description</label>
          <input
            type="text"
            placeholder="Project Description"
            className={`${input} py-8`}
          />
        </span>
        <div className={flex}>
          <span className={labelForm}>
            <label className="text-secondary">Git Link</label>
            <input
              type="link"
              placeholder="Enter your Git link"
              className={input}
            />
          </span>
          <span className={labelForm}>
            <label className="text-secondary">Live Link</label>
            <input
              type="link"
              placeholder="Enter your live link"
              className={input}
            />
          </span>
        </div>
        <select className={`${input}`}>
          <option value="" className="text-secondary">
            Select a stack
          </option>
          {fetchedcartegory.map((cartegory) => (
            <option
            key={cartegory.id}
              value={cartegory.id}
              className="bg-white"
            >
              {cartegory.name}
            </option>
          ))}
        </select>
        <button
        //   disabled={loading || !validForm ? true : false}
          className="relative gradient bg-secondary text-white px-4 py-2 rounded w-[100%] disabled:opacity-10 disabled:cursor-none hover:bg-primary"
        >
          Register Now
        </button>
        <BiX className="absolute top-[-10px] right-[-10px] bg-secondary text-white rounded-full text-3xl cursor-pointer hover:bg-primary"           onClick={closeHandler}/>
      </form>
    </section>
  );
};

export default ProjForm;
