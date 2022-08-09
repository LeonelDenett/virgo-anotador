// Next
import {useState, useEffect} from 'react';
// Styles
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import '../styles/globals.css';
// Mui Components
import Box from '@mui/material/Box';
// Mui Theme
import theme from '../styles/MuiTheme';
// Components
import HeadMeta from '../components/Head'
import PreLoader from '../components/PreLoader/PreLoader';
import Layout from '../components/Layout';
// Framer Motion
import { motion, AnimatePresence } from 'framer-motion';

function MyApp({ Component, pageProps }) {
    const [loading, setLoading] = useState(false);

    useEffect(() =>{
        setTimeout(() => setLoading(true), 3000);
    })

    return (
        <ThemeProvider theme={theme}>
            <HeadMeta/>
            <CssBaseline/>
            <AnimatePresence exitBeforeEnter>
                {
                    loading ? (
                        <Box component={motion.div} key="Layout">
                            <Layout>
                                <Component {...pageProps}/>
                            </Layout>
                        </Box>
                    )
                    :
                    (
                        <PreLoader loading={loading}/>
                    )
                }
            </AnimatePresence>
        </ThemeProvider>
    )
}

export default MyApp
