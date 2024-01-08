import { redirect } from "react-router-dom";

export const ProtectRoute =()=> {
    const token = window.localStorage.getItem('token');
    if(!token){
        return redirect('/auth')
    }
    return null
}

export const protectAuth =()=> {
    const token = window.localStorage.getItem('token');
    console.log('yipeee')
    if(token){
        console.log('okayy')
        return redirect('/')
    }
    return null   
}