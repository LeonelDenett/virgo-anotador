import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles';

// Mui Theme
let theme = createTheme({
    typography: {
        fontFamily: [
            'Bungee Inline',
        ].join(','),
        footer: {
            fontSize: '0.65rem'
        }
    },
    palette: {
        primary: { main: "#ffffff" },
        secondary: { main: "#000000DE" },
        error: { main: "#f83600" },
        warning: { main: "#f83600" }
    },
});

theme = responsiveFontSizes(theme);

export default theme;