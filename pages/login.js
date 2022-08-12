// Next
import { useRouter } from "next/router";
import { useState } from 'react';
// Styles
import styles from "../styles/Auth.module.css";
// Mui Components
import Box from "@mui/material/Box";
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
// Components
import Logo from '../components/Logo';
// Formik and Yup Validation
import { useFormik, Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
// Firebase
import { auth } from "../firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";


// Validations Yup
const validationSchema = yup.object({
    email: yup
        .string()
        .email('Email invalido')
        .required('Email requerido PA'),
    password: yup
        .string()
        .min(8, 'Contraseña muy corta... min 8')
        .required('Contraseña requerida Pa'),
});

function Login() {
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = (e) => {
        // e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            console.log("Logeado")
            router.push('/')
        })}

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            signInWithEmailAndPassword(auth, values.email, values.password)
            .then(() => {
                console.log("Logeado")
                router.push('/')
            })
        },
        // onSubmit: values => {
        //     signInWithEmailAndPassword(auth, email, password)
        //     .then(() => {
        //         console.log("Logeado")
        //         router.push('/')
        //     })
        // },
    })

    return (
        <Box className={styles.container}>
            <Box className={styles.card}>
                <Logo logoImage={styles.logoImage} logoContainer={styles.logoContainer} width={250} height={250} />
                
                {/* <form
                    onSubmit={formik.handleSubmit}
                >
                    <TextField
                        variant="contained"
                        label="Enter your email"
                        name="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                    />
                    {formik.errors.email}
                    <TextField
                        name="password"
                        label="Password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                    />
                    {formik.errors.password}
                    <Button variant="contained" type="submit">Sumbit</Button>
                </form> */}
                <form onSubmit={formik.handleSubmit} initialValues={formik.initialValues}>
                    <TextField
                    fullWidth
                    id="email"
                    name="email"
                    label="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    autoComplete='off'
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    // helperText={formik.touched.email && formik.errors.email}
                    />
                    <span style={{color: 'white'}}> {formik.touched.password && formik.errors.password}</span>
                    <TextField
                    fullWidth
                    id="password"
                    name="password"
                    label="Password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    autoComplete='off'
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    // helperText={formik.touched.password && formik.errors.password}
                    
                    />
                    <span style={{color: 'white'}}> {formik.touched.password && formik.errors.password}</span>
                    
                    <Button color="primary" variant="contained" fullWidth type="submit">
                    Submit
                    </Button>
                </form>
            </Box>
        </Box>
    );
}

export default Login;