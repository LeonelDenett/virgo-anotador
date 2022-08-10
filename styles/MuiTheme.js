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
        primary: {main: "#ffffff"},
        secondary: {main: "rgb(0,0,0, 0.87)"}
    }
});

theme = responsiveFontSizes(theme);

export default theme;