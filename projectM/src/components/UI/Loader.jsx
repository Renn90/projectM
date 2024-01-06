import React from "react";

const Loader = () => {
  return (
    <div className="fixed left-0 top-[0] h-[100%] flex justify-center items-center w-[100%] bg-black/70 z-[999]">
      <span className="spinner-big"></span>
    </div>
  );
};

export default Loader;
