import { getAuth, signOut } from "firebase/auth"
import { redirect } from "react-router-dom"

export const lougoutAction =()=> {
    const auth = getAuth()
    logout()
    async function logout(){
        try{
           await signOut(auth);
        }catch(error){
          console.log(error)
        }
        return null;
    };
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('expiration')
    return redirect('/')
}