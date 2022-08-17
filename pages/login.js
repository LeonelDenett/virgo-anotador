// Next
import Link from 'next/link';
import { useRouter } from "next/router";
import { useState } from "react";
// Styles
import styles from "../styles/Auth.module.css";
// Mui Components
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
// Components
import Logo from "../components/Logo";
import Input from "../components/Input";
// Formik and Yup Validation
import { useFormik } from "formik";
import {validationSchema} from "../components/Formik/Validations";
// Firebase
import { auth } from "../firebase/firebase-config";
import { signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail } from "firebase/auth";
import { useAuthValue } from "../firebase/AuthContext";
// Toastify
import { toast } from "react-toastify";

function Login() {
    // Current User
    const {currentUser} = useAuthValue()
    
    const router = useRouter();
    const {setTimeActive} = useAuthValue()
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            signInWithEmailAndPassword(auth, values.email, values.password)
            .then(() => {
                if(!auth.currentUser.emailVerified) {
                    sendEmailVerification(auth.currentUser)
                    .then(() => {
                        setTimeActive(true),
                        router.push('/verify-email');
                        console.log("Logeado");
                })
                }else {
                    router.push('/');
                }
            })
            .catch (error => {
                if (error.code === 'auth/user-not-found') {
                    toast.error('Error: Usuario o Contraseña invalido.')
                }
                else if (error.code === 'auth/wrong-password') {
                    toast.error('Error: Usuario o Contraseña invalido.')
                }
                else if (error.code === 'auth/too-many-requests') {
                    toast.error('Error: Intentaste logearte muchas veces erroneamente, te bloqueamos por cuestiones de seguridad. Intentá logearte mas tarde')
                }
                else {
                    toast.error(error.message)
                }
            })
        },
    });

    return (
        <Box className={styles.container} sx={{px: {xs: '1.25rem', md: '10rem', lg: '20rem'}, py: {xs: '1.25rem', lg: '1.5rem'}}}>
            <Box className={styles.card}>
                {/* Logo */}
                <Logo logoImage={styles.logoImage} logoContainer={styles.logoContainer} width={250} height={250} />
                {/* Login Form */}
                <form onSubmit={formik.handleSubmit}>
                    <Input
                        name={"email"}
                        label={"Email"}
                        formik={formik}
                        error={formik.touched.email && (formik.errors.email)}
                        styles={styles}
                    />
                    <Input
                        name={"password"}
                        label={"Password"}
                        formik={formik}
                        error={formik.touched.password && (formik.errors.password)}
                        styles={styles}
                    />
                    {/* Submit Button */}
                    <Button className={styles.submitButton} color="primary" variant="contained" fullWidth type="submit">
                        entrar
                    </Button>
                    {/* Reset Password */}
                    <Button variant="link">
                        <Link href="/reset-password">
                            <Typography mt={3} variant="caption">Olvidaste la contraseña?</Typography>
                        </Link>
                    </Button>
                    {/* Link to Register */}
                    <Box mt={3} className={styles.link}>
                        <Typography color="primary" variant="caption">¿No tienes una cuenta? </Typography>
                        <Link href="/register">
                            <Typography sx={{cursor: "pointer"}} color="secondary" variant="link">
                                Registrate
                            </Typography>
                        </Link>
                    </Box>
                </form>
            </Box>
        </Box>
    );
}

export default Login;