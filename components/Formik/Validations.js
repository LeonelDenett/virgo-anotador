import * as yup from 'yup';

// Validations Yup
export const validationSchema = yup.object({
    email: yup
        .string()
        .email('Email invalido')
        .required('Email requerido'),
    password: yup
        .string()
        .min(8, 'Min 8 caracteres')
        .required('Contraseña requerida'),
});