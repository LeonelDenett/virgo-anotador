// Mui Components
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
// Formik
import { ErrorMessage } from 'formik';
// Styles
import styles from "../styles/Auth.module.css";

export const InputTextField = ({field, form: {errors, touched}, ...props}) => (
    <Box mb={3}>
        <TextField
            variant="outlined"
            sx={{"& .MuiOutlinedInput-root": {
                "& fieldset": {
                    borderColor: "#ffffff",
                    borderRadius: "1rem"
                },
            }}}
            fullWidth
            label={field.name}
            autoComplete="off"
            error={touched[field.name] && errors[field.name]}
            InputLabelProps={ touched && errors ? {className: styles.label} : {className: styles.labelError}}
            inputProps={{className: styles.labelText}}
            {...field}
            {...props}
        />
        <ErrorMessage name={field.name}>
            {msg => <Typography variant="subtitle2">{msg}</Typography>}
        </ErrorMessage>
    </Box>
);