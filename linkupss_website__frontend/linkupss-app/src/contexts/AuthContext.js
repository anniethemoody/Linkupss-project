import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
const AuthContext = React.createContext();

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
