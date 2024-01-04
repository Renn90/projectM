import { createContext, useEffect, useState } from "react";
import { sanityAPI, sanityToken } from "./AuthFunction";
import { jwtDecode } from "jwt-decode";
import { redirect} from "react-router-dom";

const Context = createContext();

const value = 'user';

export const UserContext = ({ children }) => {
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default UserContext;

export const userLoader = async () => {
  const token = window.localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      const uid = decoded.user_id
      fetchUser(uid)
      console.log(decoded);
    } else {
      return redirect("/Auth");
    }
    async function fetchUser (uid){
      console.log(uid)
      try {
        const response = await fetch(`${sanityAPI}/${uid}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${sanityToken}`,
          },
        });
    
        const user = await response.json();
        console.log(user);
        return null
      } catch (err) {
        console.log(err);
        return null
      }
    }
    return null
};

