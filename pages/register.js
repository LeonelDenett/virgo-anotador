// Next
import Link from 'next/link';
import { useRouter } from "next/router";
// Styles
import styles from "../styles/Auth.module.css";
// Mui Components
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
// Components
import Logo from '../components/Logo';
import Input from "../components/Input";
// Formik and Yup Validation
import { useFormik } from 'formik';
import {validationSchema} from '../components/Formik/Validations';
// Firebase
import { useAuthValue } from '../firebase/AuthContext';
import { auth } from "../firebase/firebase-config";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
// Toastify
import { toast } from 'react-toastify';
// Frmaer Motion
import { motion, AnimatePresence } from "framer-motion";

function Register() {
    // Timer for Email Validation
    const {setTimeActive} = useAuthValue();
    // Create User
    const router = useRouter();
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            createUserWithEmailAndPassword(auth, values.email, values.password)
            .then(() => {
                console.log("Cuenta creada");
                sendEmailVerification(auth.currentUser, {url: "http://localhost:3000/login"});
                setTimeActive(true);
                toast.success("Cuenta creada con exito");
                router.push("/verify-email");
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    toast.error('Email ya utilizado, prueba con otro.');
                }
                else {
                    toast.error(error.message);
                }
            })
        },
    }, []);
    return (
        <Box className={styles.container}>
            <Box className={styles.card}>
                <Logo logoImage={styles.logoImage} logoContainer={styles.logoContainer} width={250} height={250} />
                {/* Create User Form */}
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
                    <AnimatePresence>
                        <Button
                            component={motion.button}
                            className={styles.submitButton}
                            color="primary"
                            variant="contained"
                            fullWidth
                            type="submit"
                        >
                            Crear cuenta
                        </Button>
                    </AnimatePresence>
                    {/* Link to Login */}
                    <Box mt={3} className={styles.linkToLogin}>
                        <Typography color="primary" variant="caption">¿Ya tienes una cuenta? </Typography>
                        <Link href="/login"><Typography sx={{cursor: "pointer"}} color="error" variant="link">Entrar</Typography></Link>
                    </Box>
                </form>
            </Box>
        </Box>
    );
}

export default Register;