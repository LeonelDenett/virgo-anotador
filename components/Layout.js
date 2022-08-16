// Styles
import styles from '../styles/Layout.module.css';
// Mui Components
import Box from '@mui/material/Box';
// Components
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';
// Framer Motion
import { motion } from 'framer-motion';
// Toastify
import ToastifyContainer from './ToastifyContainer';

function Layout({children}) {
    return (
        <>
            <ToastifyContainer/>
            <Box
                component={motion.div}
                initial={{ opacity: 0, scale: 1.5, borderRadius: 200 }}
                animate={{ opacity: 1, scale: 1, borderRadius: 0 }}
                transition={{ duration: 1 }}
            >
                <Navbar/>
                <Box className={styles.container}>
                    {children}
                </Box>
                <Footer/>
            </Box>
        </>
    );
}

export default Layout;