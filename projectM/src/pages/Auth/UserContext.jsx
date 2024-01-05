import { createContext } from "react";
import { useLoaderData } from "react-router-dom";

export const Context = createContext();

export const UserContext = ({ children }) => {
  const user = useLoaderData('layout')

  return (<Context.Provider value={user}>{children}</Context.Provider>);
};

export default UserContext;