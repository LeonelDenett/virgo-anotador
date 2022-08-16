// Next
import { useRouter } from "next/router";
// Formik and Yup Validation
import { useFormik } from 'formik';
import {validationSchema} from './Validations';
// Firebase
import { auth } from "../../firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
// Toastify
import { toast } from 'react-toastify';

function Submit() {
    const router = useRouter();
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
        },
    });
}

export default Submit;

