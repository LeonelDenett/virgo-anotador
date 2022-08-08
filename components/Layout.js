// Styles
import styles from '../styles/Layout.module.css';
// Mui Components
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles';
// Components
import HeadMeta from './Head';
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';
// Framer Motion
import { motion } from 'framer-motion';

let theme = createTheme();
theme = responsiveFontSizes(theme);

function Layout({children}) {
    return (
        <ThemeProvider theme={theme}>
            <HeadMeta/>
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
        </ThemeProvider>
    );
}

export default Layout;