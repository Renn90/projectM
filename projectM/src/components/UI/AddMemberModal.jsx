import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa6";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "../../client";
import { sanityToken } from "../../pages/Auth/AuthFunction";

const AddMemberModal = ({ closeModal }) => {
  const [users, setUsers] = useState([]);

  const usersQuery = `*[_type == "user"] {
        _id,
        email,
        firstname,
        image
    }`;

  const userImage = (user) => {
    console.log(user)
    if (user.image && user.image.asset) {
      const builder = imageUrlBuilder(client);
      const imageUrl = builder.image(user.image).url();
      return imageUrl;
    }
  };

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await client.fetch(usersQuery, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${sanityToken}`,
            "Content-Type": "application/json",
          },
        });
        setUsers(response);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUsers();
  }, []);

  return (
    <dialog className="absolute bg-transparent top-0 rounded p-4 flex justify-center items-center w-[100%] h-[100%] mb-[20%] md:mb-0">
      <div
        className="absolute inset-0 bg-[#00000081] rounded h-[100%] w-full z-[9]  flex items-center justify-center cursor-pointer"
        onClick={() => closeModal(false)}
      />
      <div className="max-w-[400px] w-full m-0 z-[999] p-3 bg-white rounded-lg flex flex-col sm:m-0 sm:p-4">
        <h2 className="font-bold text-sm my-1">Add a Member to this project</h2>
        <span className="border-[1px] border-grey flex justify-between items-center">
          <input
            placeholder="Enter user email to search"
            className="border-none outline-none p-2 bg-transparent"
          />
          <button className="p-2 bg-secondary text-white hover:opacity-80">Search</button>
        </span>
        <div className="flex flex-col items-center max-h-[200px] p-2 overflow-y-scroll ">
          {users.map((user) => (
            <div key={user._id} className="bg-grey w-full p-2 rounded my-1 flex items-center">
              {user.image ? (
                <img
                  src={userImage(user)}
                  className="w-[40px] h-[40px] rounded-full border-[2px] border-grey object-cover cursor-pointer mr-2"
                />
              ) : (
                <div className="bg-white rounded-full h-[40px] w-[40px] mr-2">
                  <FaUser className="m-auto text-[grey] h-full" />
                </div>
              )}
              <p className="font-bold">{user.firstname}</p>
            </div>
          ))}
        </div>
      </div>
    </dialog>
  );
};

export default AddMemberModal;
