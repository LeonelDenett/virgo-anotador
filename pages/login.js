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
import { auth } from "../firebase/firebase-config";
import { signInWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { useAuthValue } from '../firebase/AuthContext';
// Toastify
import { toast } from 'react-toastify';

function Login() {
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
                .catch(error => {
                    if (error.code === 'auth/user-not-found') {
                        toast.error('Usuario o Contraseña invalido.')
                    }
                    else if (error.code === 'auth/wrong-password') {
                        toast.error('Usuario o Contraseña invalido.')
                    }
                    else if (error.code === 'auth/too-many-requests') {
                        toast.error('Intentaste logearte muchas veces erroneamente, te bloqueamos por cuestiones de seguridad. Intentá logearte mas tarde')
                    }
                    else {
                        toast.error(error.message)
                    }
                })
                }else {
                    router.push('/');
                }
            })
            .catch (error => {
                toast.error(error.message)
            })
        },
    });
    return (
        <Box className={styles.container}>
            <Box className={styles.card}>
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
                    <Button className={styles.submitButton} color="primary" variant="contained" fullWidth type="submit">
                        entrar
                    </Button>
                    <Box mt={3}>
                    <Typography color="primary" variant="caption">¿No tienes una cuenta? </Typography>
                    <Link href="/register">
                        <Typography sx={{cursor: "pointer"}} color="error" variant="link">Registrate</Typography>
                    </Link>
                    </Box>
                </form>
            </Box>
        </Box>
    );
}

export default Login;