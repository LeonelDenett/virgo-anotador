import { useEffect, useState } from "react";
import { auth } from "../firebase/firebase-config";
import useAuth from "../hook/auth";

function AuthStateChanged({children}) {
    const { setUser } = useAuth();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        auth().onAuthStateChanged((user) => {
            setUser(user)
            setLoading(false)
        });
        // eslint-disable-next-line
    }, []);

    if(loading){
        return <div>Loading</div>
    }
    return children
}

export default AuthStateChanged;