import {createTheme, ThemeProvider} from "@mui/material";
import {CssBaseline} from "@mui/material";
import {green, amber, purple, grey} from "@mui/material/colors";



const Theme = createTheme( {
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
        },
    }
});

export default ({ children }) => (
    <ThemeProvider theme={Theme}>
        <CssBaseline />
        {children}
    </ThemeProvider>
)