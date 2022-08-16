import { createContext, useContext, useState } from "react";

const authContext = createContext();

export default function useAuth(){
    return useContext(authContext);
}

export function AuthProvider(props){
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    const logout = async () => {
        await AuthService.logout();
        setUser(null);
    }
    const value = {user,error,logout, setUser}

    return <authContext.Provider value={value} {...props} />
}