import Link from "next/link";
import { useRouter } from "next/router";
// Styles
import styles from './Navbar.module.css'
// Mui Components
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
// Firebase
import { useAuthValue } from '../../firebase/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebase-config';

function Navbar() {
    // Current User
    const {currentUser} = useAuthValue()
    const router = useRouter();
    const logout = async () => {
        await signOut(auth);
        router.push("/login")
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="sticky" className={styles.navbar}>
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Menu
                </Typography>
                {router.pathname !== "/"? null: <Button onClick={logout} color="inherit">Logout</Button>}
            </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Navbar;