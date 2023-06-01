import { createContext, useEffect, useState } from "react";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile, signInWithPopup } from "firebase/auth";
import app from "../firebase/firebase.config";
import { GoogleAuthProvider } from "firebase/auth";
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
        setLoading(false) 
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
