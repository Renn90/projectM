import React, { useEffect, useState } from "react";
import { FaPlus, FaUser } from "react-icons/fa6";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "../../client";
import { sanityAPI, sanityToken } from "../../pages/Auth/AuthFunction";

const AddMemberModal = ({ closeModal, project, refetch }) => {
  const [email, setEmail] = useState('')
  const [users, setUsers] = useState([]);

  const usersQuery = `*[_type == "user" && email == '${email}'] {
        _id,
        email,
        firstname,
        image
    }`;

    const handleEmail =(e)=> {
      setEmail(e.target.value)
    }


    const fetchUser = async ()=> {
      try {
        const response = await client.fetch(usersQuery, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${sanityToken}`,
            "Content-Type": "application/json",
          },
        });
        setUsers(response);
      }catch(error){
        console.log(error);
      }
    }

  const userImage = (user) => {
    console.log(user)
    if (user.image && user.image.asset) {
      const builder = imageUrlBuilder(client);
      const imageUrl = builder.image(user.image).url();
      return imageUrl;
    }
  };

  console.log(project)

  const addMember = async () => {
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
                  before: "members[-1]",
                  items: [
                    {
                      _key: users[0]._id,
                      user: {
                        _ref: users[0]._id,
                        _type: "reference",
                      },
                      role: "Contributor",
                    },
                  ],
                },
              },
            },
          ],
        }),
      });
  
      if (!res.ok) {
        throw new Error("Failed to add member to project");
      }
  
      closeModal(null);
      refetch();
      console.log(res);
      return "added";
    } catch (error) {
      console.log(error);
    }
  };
  
  

  return (
    <dialog className="absolute bg-transparent top-0 rounded p-4 flex justify-center items-center w-[100%] h-[100%] mb-[20%] md:mb-0">
      <div
        className="absolute inset-0 bg-[#00000081] rounded h-[100%] w-full z-[9]  flex items-center justify-center cursor-pointer"
        onClick={() => closeModal(false)}
      />
      <div className="max-w-[400px] w-full m-0 z-[999] p-3 bg-white rounded-lg flex flex-col sm:m-0 sm:p-4">
        <h2 className="font-bold text-sm">Add a Member to this project</h2>
        <p className="py-2 text-xs">Input a users email into the search bar to find and add a user to this project.</p>
        <span className="border-[1px] border-grey w-full flex justify-between items-center">
          <input
            placeholder="Enter user email to search"
            className="border-none outline-none p-2 bg-transparent"
            onChange={handleEmail}
          />
          <button className="p-2 bg-secondary text-white hover:opacity-80" onClick={fetchUser}>Search</button>
        </span>
       {users && <div className="flex flex-col items-center max-h-[200px] my-2">
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
              <span className="ml-auto px-2 cursor-pointer hover:opacity-70" onClick={addMember}>
              <FaPlus />
              </span>
            </div>
          ))}
        </div>}
      </div>
    </dialog>
  );
};

export default AddMemberModal;
