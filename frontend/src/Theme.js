//Imports
import {createTheme, ThemeProvider} from "@mui/material";
import {CssBaseline} from "@mui/material";
import {green, amber, purple, grey, brown} from "@mui/material/colors";

//Instanciation du Theme MUI
const Theme = createTheme( {
    //Gestion des couleurs pour les composents
    palette: {
        mode: "dark",
        primary: {
            main: green[800],
        },
        secondary: {
            main: amber[700]
        },
        third: {
            main: purple[200]
        },
        lightHover: {
            main: grey[50]
        },
        gmColor: {
            main: brown[400]
        },
    },
    //Styles pour les inputs
    components: {
        MuiOutlinedInput: {
            styleOverrides: {
                input: {
                    '&:-webkit-autofill': {
                        'WebkitBoxShadow': '0 0 0 100px var(--primary-weak) inset',
                        'WebkitTextFillColor': 'var(--text-primary)',
                    },
                },
            },
        },
    }
});

//Export du provider pour le theme MUI
export default ({ children }) => (
    <ThemeProvider theme={Theme}>
        <CssBaseline />
        {children}
    </ThemeProvider>
)