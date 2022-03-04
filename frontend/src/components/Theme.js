import {createTheme, ThemeProvider} from "@mui/material";
import {CssBaseline} from "@mui/material";
import { green, amber } from "@mui/material/colors";


const Theme = createTheme( {
    palette: {
        mode: "dark",
        primary: {
            main: green[800]
        },
        secondary: {
            main: amber[700]
        }
    },
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
            MuiCssBaseline: {
                styleOverrides: {
                    body: {
                        backgroundColor: "primary",
                        margin: 0,
                        padding: 0,
                    },
                },
            },
        },
    }
});

export default ({ children }) => (
    <ThemeProvider theme={Theme}>
        <CssBaseline />
        {children}
    </ThemeProvider>
)