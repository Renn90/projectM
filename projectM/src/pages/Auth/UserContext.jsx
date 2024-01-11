import { createContext, useEffect, useState } from "react";
import { redirect, useLoaderData } from "react-router-dom";

export const Context = createContext();

export const UserContext = ({ children }) => {
  const user = useLoaderData('layout');
  redirect('/')

  return (<Context.Provider value={user}>{children}</Context.Provider>);
};

export default UserContext;