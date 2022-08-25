// Next
import Link from "next/link";
import { useRouter } from "next/router";
// Styles
import styles from "../styles/Auth.module.css";
// Mui Components
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
// Mui Icons
import LockIcon from '@mui/icons-material/Lock';
// Components
import Logo from "../components/Logo";
import { InputTextField } from "../components/InputTextField";
// Formik and Yup Validation
import { Formik, Form, Field  } from "formik";
import {validationSchemaAuth} from "../components/Formik/Validations";
// Firebase
import { auth } from "../firebase/firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
// Toastify
import { toast } from "react-toastify";

function Login() {
    // Router
    const router = useRouter();

    return (
        <Box className={styles.container} sx={{px: {xs: "1.25rem", md: "10rem", lg: "20rem"}, py: {xs: "1.25rem", lg: "1.5rem"}}}>
            <Box className={styles.card}>
                {/* Logo */}
                <Logo logoImage={styles.logoImage} logoContainer={styles.logoContainer} width={250} height={250} />
                {/* Login Form */}
                <Formik
                    initialValues={{email: '', password: ''}}
                    validationSchema={validationSchemaAuth}
                    onSubmit={values => {
                        signInWithEmailAndPassword(auth, values.email, values.password)
                        .then(() => {
                            router.push("/")
                        })
                        .catch (error => {
                            if (error.code === "auth/user-not-found") {
                                toast.error("Error: Usuario o Contraseña invalido.")
                            }
                            else if (error.code === "auth/wrong-password") {
                                toast.error("Error: Usuario o Contraseña invalido.")
                            }
                            else if (error.code === "auth/too-many-requests") {
                                toast.error("Error: Intentaste logearte muchas veces erroneamente, te bloqueamos por cuestiones de seguridad. Intentá logearte mas tarde")
                            }
                            else {
                                toast.error(error.message)
                            }
                        })
                    }}
                >
                    <Form>
                        {/* Email */}
                        <Field name="email" component={InputTextField}/>
                        {/* Password */}
                        <Field name="password" component={InputTextField} styles={styles}/>
                        {/* Submit */}
                        <Button
                            className={styles.submitButton}
                            color="primary"
                            variant="contained"
                            fullWidth
                            type="submit"
                        >
                            Entrar
                        </Button>
                        {/* Reset Password */}
                        <Box className={styles.linkContainer}>
                            <Typography color="primary" variant="caption">Olvidaste la contraseña?</Typography>
                            <Link href="/reset-password">
                                <LockIcon fontSize="small" className={styles.link} color="secondary"/>
                            </Link>
                        </Box>
                        {/* Link to Register */}
                        <Box className={styles.linkContainer}>
                            <Typography color="primary" variant="caption">No tienes una cuenta?</Typography>
                            <Link href="/register">
                                <Typography className={styles.link} color="secondary" variant="subtitle2">
                                    Registrate
                                </Typography>
                            </Link>
                        </Box>
                    </Form>
                </Formik>
            </Box>
        </Box>
    );
}

export default Login;