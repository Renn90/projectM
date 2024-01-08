import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { json, redirect } from "react-router-dom";

export const sanityAPI = `https://jf3w5ozh.api.sanity.io/v1/data/mutate/production`;
export const sanityToken =
  "skm3L8hv2jH8jJjUb4Z1F7sTIM6aDdO6loo00BQ8ugV0d8fM19BxFdZzQRuBRSy5n1Rs7mJZcnuyEm9LyJEsW4XgPbRr6EQcHlVspTMjI73p9X3GeR5uEeaBa6tA7MpWov2mcG4UzAuFJXd3HGXKquSGssU1xt0hceGtAUA56QC6qhbuG8Cq";

export const signUpAction = async ({ request }) => {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode");
  const auth = getAuth();
  const data = await request.formData();
  const authData = {
    email: data.get("email"),
    password: data.get("password"),
    firstname: data.get("firstname"),
    lastname: data.get("lastname"),
  };

  if(mode === "Login"){
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        authData.email,
        authData.password
      );
      const token = await userCredential.user.getIdToken();
      window.localStorage.setItem("token", token);
      const expireLogout = new Date();
      expireLogout.setHours(expireLogout.getHours() + 10)
      window.localStorage.setItem('expiration', expireLogout.toISOString())
      return redirect('/')
    }catch(err){
      if (err.code === "auth/invalid-credential") {
        return 401;
      }
      }
  }else if(mode === "Reset"){
    return handlePasswordReset()
    async function handlePasswordReset(){
      try {
        const auth = getAuth();
        await sendPasswordResetEmail(auth, authData.email);
          return 'RESET_EMAIL_SENT';
      } catch (error) {
        console.log(error);
        return json('Error, try again');
      }
    }    
  }else {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        authData.email,
        authData.password
      );
      const token = await userCredential.user.getIdToken();
      window.localStorage.setItem("token", token);
      const expireLogout = new Date();
      expireLogout.setHours(expireLogout.getHours() + 10)
      window.localStorage.setItem('expiration', expireLogout.toISOString())
      const { uid, email: userEmail } = userCredential.user;
      const userDataForSanity = {
        _id: uid, // Useing Firebase UID as the Sanity document ID
        _type: "user",
        firstname: authData.firstname,
        lastname: authData.lastname,
        email: userEmail,
      };

      const res = await fetch(sanityAPI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sanityToken}`,
        },
        body: JSON.stringify({
          mutations: [{ createOrReplace: userDataForSanity }],
        }),
      });
      if (res.ok) {
        return redirect("/");
      } else {
        throw json({ message: "Something went wrong, please try again." });
      }
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        return 409;
      }
      return null
    }
  } 
};
