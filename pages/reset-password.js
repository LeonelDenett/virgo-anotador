// Next
import Link from 'next/link';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
// Styles
import styles from "../styles/Auth.module.css";
// Mui Components
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
// Mui Icons
import WestRoundedIcon from '@mui/icons-material/WestRounded';
// Components
import Input from "../components/Input";
// Toastify
import { toast } from "react-toastify";
// Formik and Yup Validations
import { useFormik } from "formik";
import {validationSchemaResetPassword} from "../components/Formik/Validations";
// Firebase
import { auth } from "../firebase/firebase-config";
import { useAuthValue } from '../firebase/AuthContext';
import { sendPasswordResetEmail } from "firebase/auth";

function ResetPassword() {
    const router = useRouter()
    // Reset Password
    const resetPassword = () => {
        sendPasswordResetEmail(auth, formik.values.email, {url: "http://localhost:3000/login"})
        .then(() => {
            console.log("Link enviado a:", formik.values.email)
            toast.success('Link para restablecer contraseña enviado con éxito.')
            setButtonDisabled(true)
            setTimeActive(true)
            router.push("/login")
        })
        .catch(error => {
            if (error.code === 'auth/user-not-found') {
                toast.error('Error: Email no coincide con nuestra base de datos.')
            }
            if (error.code === 'auth/missing-email') {
                toast.error('Error: Ingresa un Email valido.')
            }
            if (error.code === 'auth/invalid-email') {
                toast.error('Error: Ingresa un Email valido.')
            }
            else {
                toast.error(error.message)
            }
        })
    }
    // Formik
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchemaResetPassword,
        onSubmit: resetPassword
    });
    // Timer for reset Password
    const [ buttonDisabled, setButtonDisabled] = useState(false);
    const { timeActive, setTimeActive } = useAuthValue();
    const [time, setTime] = useState(60);

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

    return (
        <Box className={styles.container} sx={{px: {xs: '1.25rem', md: '10rem', lg: '20rem'}, py: {xs: '1.25rem', lg: '1.5rem'}}}>
            <Box className={styles.card}>
                <Typography color="primary" mb={3} id="transition-modal-title" variant="h2" component="h2">
                    Cambio de contraseña.
                </Typography>
                <Typography color="primary" mb={3} id="transition-modal-title" variant="h6" component="h2">
                    Ingresa tu email y te enviaremos un correo con información para recuperar tu cuenta.
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                    <Input
                        name={"email"}
                        label={"Email"}
                        formik={formik}
                        error={formik.touched.email && (formik.errors.email)}
                        styles={styles}
                    />
                    {/* Reset Password Button */}
                    <Box mt={3}>
                        <Button disabled={timeActive} className={styles.submitButton} color="primary" variant="contained" fullWidth type="submit">
                            recuperar contraseña {timeActive && time}
                        </Button>
                    </Box>
                </form>
                {/* Back to Login Page */}
                <Box mt={24} className={styles.backToLogin}>
                    <Button variant="contained" startIcon={<WestRoundedIcon/>} className={styles.submitButton}>
                        <Link href="/login">
                            <Typography variant="caption">Volver</Typography>
                        </Link>
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}

export default ResetPassword;