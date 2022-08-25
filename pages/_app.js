// Next
import { useRouter } from "next/router";
import {useState, useEffect} from "react";
// Styles
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "../styles/globals.css";
// Mui Components
import Box from "@mui/material/Box";
// Mui Theme
import theme from "../styles/MuiTheme";
// Components
import HeadMeta from "../components/Head"
import PreLoader from "../components/PreLoader/PreLoader";
import Layout from "../components/Layout";
// Framer Motion
import { motion, AnimatePresence } from "framer-motion";
// Firebase
import { auth } from "../firebase/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { AuthProvider } from "../firebase/AuthContext";
import { UserAuthContextProvider } from '../firebase/AuthContext'

function MyApp({ Component, pageProps }) {
    const [loading, setLoading] = useState(false);
    // const [currentUser, setCurrentUser] = useState(null);
    // const [timeActive, setTimeActive] = useState(false);
    // Loader
    useEffect(() =>{
        setTimeout(() => setLoading(true), 2000);
    })
    // // User State
    // useEffect(() => {
    //     onAuthStateChanged(auth, (user) => {
    //         if (user) {
    //             console.log("State = definitely signed in")
    //         } else {
    //             console.log("State = definitely signed out")
    //         }
    //         setCurrentUser(user)
    //     })
    // }, [auth])
    // Linea de abajo va en authprovider
    // value={{currentUser, timeActive, setTimeActive}}

    return (
        <UserAuthContextProvider>
        <ThemeProvider theme={theme}>
            <HeadMeta/>
            <CssBaseline/>
            <AnimatePresence exitBeforeEnter>
                {
                    loading ? (
                        <Box key="Pages">
                            <motion.div component={motion.div} key="Expanded">
                                <Layout>
                                    <Component {...pageProps}/>
                                </Layout>
                            </motion.div>
                        </Box>
                    )
                    :
                    (
                        <Box key="PreLoader">
                            <PreLoader loading={loading}/>
                        </Box>
                    )
                }
                </AnimatePresence>
        </ThemeProvider>
        </UserAuthContextProvider>
    )
}

export default MyApp
