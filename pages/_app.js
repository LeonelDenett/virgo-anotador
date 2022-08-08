// Next
import {useState, useEffect} from 'react';
// Styles
import CssBaseline from '@mui/material/CssBaseline';
// Framer Motion
import {motion, AnimatePresence} from 'framer-motion';
// Mui Components
import Box from '@mui/material/Box';
// Components
import PreLoader from '../components/PreLoader/PreLoader';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }) {
    const [loading, setLoading] = useState(false);

    useEffect(() =>{
        setTimeout(() => setLoading(true), 3000);
    })

    return (
        <>
            <CssBaseline/>
            <AnimatePresence exitBeforeEnter>
                {
                    !loading ? (
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
        </>
    )
}

export default MyApp
