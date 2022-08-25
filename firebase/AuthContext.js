// import React,{useContext} from "react"

// const AuthContext = React.createContext()

// export function AuthProvider({children, value}) {
//     return (
//         <AuthContext.Provider value={value}>
//             {children}
//         </AuthContext.Provider>
//     )
// }

// export function useAuthValue(){
//     return useContext(AuthContext)
// }
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "firebase/auth";
import { auth } from "../firebase/firebase-config";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
    const router = useRouter()
    const [user, setUser] = useState({});

    function logIn(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }
    function signUp(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const logOut = () => {
        signOut(auth);
        router.push("/login")
    };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Auth", currentUser);
        if (currentUser) {
            console.log("State = definitely signed in")
            var emailVerified = currentUser.emailVerified
            console.log("verificado:", emailVerified)
        } else {
            console.log("State = definitely signed out")
        }
      setUser(currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <userAuthContext.Provider
      value={{ user, logIn, signUp, logOut }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}