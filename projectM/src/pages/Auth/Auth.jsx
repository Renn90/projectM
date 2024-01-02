import React, {useState} from "react";
import { BiEnvelope, BiLock, BiUser } from "react-icons/bi";
import Frame from "../../components/Frame";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect } from "react";

const Auth = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassowrd, setConfirmPassowrd] = useState("");
  const [checkpassword, setcheckpassword] = useState(false);
  const [validForm, setValidForm] = useState(true);

  const validSignUp =
  firstName !== "" &&
  lastName !== "" &&
  email !== "" &&
  password !== ""&&
  password.length > 7
  password === confirmPassowrd &&
  confirmPassowrd !== "";

  const validLogin = email !== "" && password.length > 7;


    //Get & Handle the values from each input
  const handleName =(e)=> {
    setFirstName(e.target.value)
  }
  const handleLastName =(e)=> {
    setLastName(e.target.value)
  }
  const handleMail =(e)=> {
    setEmail(e.target.value)
  }
  const handlePassword =(e)=> {
    setPassword(e.target.value)
  }
  const confirmPass =(e)=> {
    setConfirmPassowrd(e.target.value)
  }

  const [searchParams] = useSearchParams()

  const isLogin = searchParams.get('mode') === 'login';

  const inputSpan = "rounded border-[1px] border-secondary flex items-center my-4 px-2";

  const input = "outline-none p-2 mx-2 w-full bg-transparent";

  return (
    <div className="container mx-auto px-6 py-10 max-w-[600px] w-full">
      <Frame>
        <div className="p-4">
        <h1 className="text-secondary font-bold text-2xl my-4">{ isLogin ? 'Log In' : 'Sign Up'}</h1>
      { !isLogin && <div className="flex w-full my-4">
          <span className={`${inputSpan} my-0 w-1/2 mr-1`}>
            <BiUser />
            <input
              type="text"
              required
              placeholder="First Name"
              name="firstname"
              onChange={handleName}
              className={input}
            />
          </span>
          <span className={`${inputSpan} my-0 w-1/2`}>
            <BiUser />
            <input
              type="text"
              required
              placeholder="Last name"
              name="lastname"
              onChange={handleLastName}
              className={input}
            />
          </span>
        </div>}
        <span className={inputSpan}>
          <BiEnvelope />
          <input
            type="email"
            required
            placeholder="Email"
            name="email"
            onChange={handleMail}
            className={input}
          />
        </span>
        <span className={inputSpan}>
          <BiLock />
          <input
            type="password"
            required
            placeholder="Password"
            name="password"
            onChange={handlePassword}
            onFocus={()=> setcheckpassword(true)}
            className={input}
          />
        </span>
        {password.length < 7 && checkpassword && !isLogin && <p className="text-[red] text-xs">Password must be above 6 digits and contain a number</p>}
       {!isLogin && <span className={inputSpan}>
          <BiLock />
          <input
            type="password"
            required
            placeholder="Confirm Password"
            name="password"
            onChange={confirmPass}
            className={input}
          />
        </span>}
        {!isLogin && <p className="text-sm mb-4">Already have an account? 
          <Link to="/auth?mode=login" className="text-secondary mx-2 hover:opacity-70">Login</Link>
        </p>}
        {isLogin && <p className="text-sm mb-4">Do not have an account yet? 
          <Link to="/auth?mode=signup" className="text-secondary mx-2 hover:opacity-70">SIgn-up</Link>
        </p>}
        {!validForm && <p className="text-[red] text-sm mb-4">Please confirm your input is valid</p>}
        <input type="submit" name="submit" disabled={isLogin ? !validLogin : !validSignUp}  className={`outline-none p-2 rounded text-white w-full cursor-pointer bg-secondary hover:opacity-70 disabled:opacity-60 disabled:cursor-not-allowed`}/>
        </div>
      </Frame>
    </div>
  );
};

export default Auth;
