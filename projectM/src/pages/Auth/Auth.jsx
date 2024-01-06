import React, { useEffect, useState } from "react";
import { BiEnvelope, BiLock, BiUser } from "react-icons/bi";
import Frame from "../../components/Frame";
import {
  Link,
  useSearchParams,
  Form,
  useNavigation,
  useActionData,
} from "react-router-dom";
import Loader from "../../components/UI/Loader";

const Auth = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassowrd, setConfirmPassowrd] = useState("");
  const [error, setError] = useState("");

  const checkPassword = () => {
    if (password.length < 7 && password.length > 0) {
      setError("Please ensure your password is above 7 digits");
    } else {
      setError("");
    }
  };

  const confirm = () => {
    if (password !== confirmPassowrd) {
      setError("Please confirm your password");
    } else {
      setError("");
    }
  };

  const validSignUp =
    firstName !== "" &&
    lastName !== "" &&
    email !== "" &&
    password !== "" &&
    password.length > 7 &&
    password === confirmPassowrd &&
    confirmPassowrd !== "";

  const validLogin = email !== "" && password.length > 7;
  const validReset = email !== '';

  const ResetState =()=> {
    setFirstName('')
    setLastName('')
    setEmail('')
    setPassword('')
    setConfirmPassowrd('')
    setEmail('')
  }

  const errorCode = useActionData();

  const navigation = useNavigation();
  const loading = navigation.state === "submitting";
  
  useEffect(()=>{
    if(loading){
      ResetState()
    }
  },[loading])

  //Get & Handle the values from each input
  const handleName = (e) => {
    setFirstName(e.target.value);
  };
  const handleLastName = (e) => {
    setLastName(e.target.value);
  };
  const handleMail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const confirmPass = (e) => {
    setConfirmPassowrd(e.target.value);
  };

  const [searchParams] = useSearchParams();

   const mode =()=> {
    if(searchParams.get("mode") === "Login"){
      return 'Login'
    }else if(searchParams.get("mode") === "Reset"){
      return 'Reset'
    }else{
      return 'Signup'
    }
  }

  const disabled =()=> {
    if(mode() === 'Login' ){
      return validLogin;
    }else if(mode() === 'Reset'){
      return validReset;
    }else{
      return validSignUp;
    }
  }

  const inputSpan = "rounded border-[1px] border-secondary flex items-center my-4 px-2";
  const input = "outline-none p-2 mx-2 w-full bg-transparent";

  return (
    <div className="container mx-auto px-6 py-10 max-w-[600px] w-full">
      <Frame>
        <Form method="post" className="p-4">
          <h1 className="text-secondary font-bold text-2xl my-4">
            {mode()}
          </h1>
          {errorCode === 409 && (
            <p className="text-[red] text-sm mb-4">
              Hey there! It seems this email is already hitched to a wagon
              here.<br/>Would you like to <Link to='/auth?mode=Login' className="text-sm mx-1 underline cursor-pointer">Log in</Link> or
              maybe rustle up a <Link to='/auth?mode=Reset' className="text-sm mx-1 underline cursor-pointer">Password Reset?</Link>
            </p>
          )}
          {errorCode === 'RESET_EMAIL_SENT' &&  <p className="text-[green] text-lg mb-4">
             Your reset mail has been sent to you Email!  <Link to='/auth?mode=Login' className="underline ml-4 font-medium">LogIn?</Link></p>
             }
          {errorCode === 401 && (
            <p className="text-[red] text-sm mb-4">
             Invalid Credential! Check and try again
            <br/>
             <span className="text-sm mt-4 underline cursor-pointer">Password Reset?</span>
            </p>
          )}
          {mode() == 'Signup' && (
            <div className="flex w-full my-4">
              <span className={`${inputSpan} my-0 w-1/2 mr-1`}>
                <BiUser />
                <input
                  type="text"
                  required
                  placeholder="First Name"
                  name="firstname"
                  value={firstName}
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
                  value={lastName}
                  onChange={handleLastName}
                  className={input}
                />
              </span>
            </div>
          )}
          <span className={inputSpan}>
            <BiEnvelope />
            <input
              type="email"
              required
              placeholder="Enter a valid Email"
              name="email"
              onChange={handleMail}
              value={email}
              className={input}
            />
          </span>
          {mode() !== 'Reset' && <span className={inputSpan}>
            <BiLock />
            <input
              type="password"
              required
              placeholder="Password"
              name="password"
              onChange={handlePassword}
              value={password}
              className={input}
              onBlur={checkPassword}
            />
          </span>}
          {mode() === 'Signup' && (
            <span className={inputSpan}>
              <BiLock />
              <input
                type="password"
                required
                placeholder="Confirm Password"
                name="password"
                onChange={confirmPass}
                value={confirmPassowrd}
                onBlur={confirm}
                className={input}
              />
            </span>
          )}
          {mode() === 'Signup' && (
            <p className="text-sm mb-4">
              Already have an account?
              <Link
                to="/auth?mode=Login"
                className="text-secondary mx-2 hover:opacity-70"
              >
                Login
              </Link>
            </p>
          )}
          {mode() === 'Login' && (
            <p className="text-sm mb-4">
              Do not have an account yet?
              <Link
                to="/auth?mode=Signup"
                className="text-secondary mx-2 hover:opacity-70"
              >
                SIgn-up
              </Link>
            </p>
          )}
          {error && <p className="text-[red] text-sm mb-4">{error}</p>}
          <input
            type="submit"
            name="submit"
            disabled={!disabled()}
            className={`outline-none p-2 rounded text-white w-full cursor-pointer bg-secondary hover:opacity-70 disabled:opacity-60 disabled:cursor-not-allowed`}
          />
        </Form>
      </Frame>
      {loading && <Loader />}
    </div>
  );
};

export default Auth;
