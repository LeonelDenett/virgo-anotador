// Next
import { useRouter } from "next/router";
import { useState,useEffect } from 'react';
// Styles
import styles from "../styles/VerifyEmail.module.css";
// Mui Components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
// Firebase
import { useAuthValue } from '../firebase/AuthContext';
import { auth } from '../firebase/firebase-config';
import { sendEmailVerification } from 'firebase/auth';
// Toastify
import { toast } from 'react-toastify';

function VerifyEmail() {
    // Current User State
    const { currentUser } = useAuthValue();
    // Resend Email
    const resendEmailVerification = () => {
        setButtonDisabled(true)
        sendEmailVerification(auth.currentUser)
        .then(() => {
            setButtonDisabled(false)
            setTimeActive(true)
        }).catch((err) => {
            toast.error(err.message)
            setButtonDisabled(false)
        })
    };
    // Timer for resend Email
    const [ buttonDisabled, setButtonDisabled] = useState(false);
    const { timeActive, setTimeActive } = useAuthValue();
    const [time, setTime] = useState(62);
    const router = useRouter();

    useEffect(() => {
        let interval = null
        if(timeActive && time !== 0 ){
          interval = setInterval(() => {
            setTime((time) => time - 1)
          }, 1000)
        }else if(time === 0){
          setTimeActive(false)
          setTime(60)
          clearInterval(interval)
        }
        return () => clearInterval(interval);
    }, [timeActive, time])

    useEffect(() => {
        const interval = setInterval(() => {
            currentUser?.reload()
            .then(() => {
                if(currentUser?.emailVerified){
                clearInterval(interval)
                router.push('/')
                }
            })
            .catch((err) => {
                toast.error(err.message)
            })
        }, 1000)
    }, [router, currentUser]);

    return (
        <Box className={styles.container} sx={{px: {xs: '1.25rem', md: '10rem', lg: '20rem'}, py: {xs: '1.25rem', lg: '1.5rem'}}}>
            <Box className={styles.card}>
                <Typography color="primary">Verifica tu dirección de correo electrónico</Typography>
                <Typography my={2} color="primary">{currentUser?.email}</Typography>
                <Button
                    variant="contained"
                    onClick={resendEmailVerification}
                    disabled={timeActive}
                >
                    Reenviar Email {timeActive && time}
                </Button>
            </Box>
        </Box>
    );
}

export default VerifyEmail;