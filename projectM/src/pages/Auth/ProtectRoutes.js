import { redirect } from "react-router-dom";

export const ProtectRoute =()=> {
    const token = window.localStorage.getItem('token');
    if(!token){
        return redirect('/auth')
    }
    return null;
}