// Styles
import styles from './PreLoader.module.css';
// Mui Components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
// Mui Icons
import SettingsIcon from '@mui/icons-material/Settings';
// Framer Motion
import { motion } from 'framer-motion';
import { fadeOut, preLoader, preLoaderIcon } from '../FramerMotionVariants/Variants';

function PreLoader() {
    return (
        <Box
        className={styles.container}
        component={motion.div}
        variants={fadeOut}
        initial="start"
        animate="animate"
        exit="exit"
        key="PreLoader"
        >
            <Box component={motion.div}
                className={styles.card}
                variants={preLoader}
                initial="start"
                animate="animate"
                exit="exit"
                key="Card"
                >
                <Typography variant="h3">Cargando</Typography>
                <SettingsIcon
                    component={motion.svg}
                    variants={preLoaderIcon}
                    initial="start"
                    animate="animate"
                />
            </Box>
            <div className={styles.progress}></div>
        </Box>
    );
}

export default PreLoader;