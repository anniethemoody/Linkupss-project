import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import { signInWithPopup, updateProfile } from "firebase/auth";
import { provider, authApp } from "../firebase";
import {getStorage,uploadBytes,uploadBytesResumable,ref, getDownloadURL} from "firebase/storage"

const AuthContext = React.createContext();
const storage = getStorage()
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
    const [loading,setLoading] = useState(true);
  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }
  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }
  function resetPassword(email){
    return auth.sendPasswordResetEmail(email)
  }
  function signInWithGoogle(){
    return signInWithPopup(authApp,provider).then((data=>{

    }))
  }
 
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
        setCurrentUser(user); //returns a method that allows you to unsubscribe from the event
        //console.log(user)
      setLoading(false);
    });

    return unsubscribe;
  }, []);
  const value = { currentUser, signup,login,resetPassword };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
export async function upload(file,currentUser){

const fileRef = ref(storage,currentUser.uid)
console.log(fileRef,file)
const snapshot = await uploadBytes(fileRef,file)
console.log(snapshot)
const photoURL = await getDownloadURL(fileRef)
updateProfile(currentUser,{
  photoURL:URL.createObjectURL(file)
})


}
