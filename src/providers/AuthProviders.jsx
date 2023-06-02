import { createContext, useEffect, useState } from "react";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile, signInWithPopup } from "firebase/auth";
import app from "../firebase/firebase.config";
import { GoogleAuthProvider } from "firebase/auth";
import axios from "axios";
export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProviders = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const googleProvider = new GoogleAuthProvider();


  const createUser = (email, password) => {
    setLoading(true)
   return createUserWithEmailAndPassword(auth, email, password)
  }
  const signIn = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
  }
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  }
  const updateUserProfile = (name, photo) => {
   return updateProfile(auth.currentUser, {
      displayName: name, photoURL: photo
    });
  }
  const googleSignIn =  () => {
    return signInWithPopup(auth, googleProvider);
  } 
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
        setUser(currentUser)
        //get and set token you can do it with fetch but for this project axios is used

        // fetch(,{
        //   method: "POST",
        //   headers: {
        //     'content-type' : 'application/json'
        //   },
        //   body: JSON.stringify()
        // })
        // .then(response => {
        //   return response.json()
        // })
        // .then()
      if(currentUser){
        axios.post('http://localhost:5000/jwt', { email: currentUser.email })
        .then(data => {
          // console.log(data.data.token)
          localStorage.setItem('access-token', data.data.token)
          setLoading(false) 
          // you have to give this in this if else statement that too at the last because if this is set outside of this block then it will
          // set the loading state to false before the jwt token arrives
          // the tanstack useQuery custom hook calls the axios api to check with the token
          // so because the token is not available it will redirect the user to the login page even if login is successful
          // it is because you called the useQuery at the navbar that does not find the token at local storage so this bug is triggered unless the user signs with a google account 
          // he will be redirected to the login page continuously because of the useAxiousSecure hook that logs out and redirects login page
          // if the api is hit without the token or with expired token 
        })
      }
      else{
        localStorage.removeItem('access-token')
        setLoading(false)
      }
      

        console.log(currentUser)

      });
      return () => {
        return unsubscribe()
      }
  },[])
  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    logOut,
    updateUserProfile,
    googleSignIn
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProviders;
