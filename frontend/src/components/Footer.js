//Import
import {BottomNavigation, BottomNavigationAction, Box} from "@mui/material";
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import {useState} from "react";
import Chat from "./Chat";

//Instanciation du composent
const Footer = () => {

    //Déclaration de constantes et states
    const [hidden, setHidden] = useState(true);
    const [value, setValue] = useState('Chat');

    //Affiche ou cache le Chat
    const handleChange = (event, newValue) => {
        if(value === 'Chat') {
            setValue('')
        }
        else {
            setValue('Chat')
        }
    };

    //JSX
    return (
        <>
            <Box
                sx={{width: {xs: "50px", md: "150px"}, position: "fixed", bottom: 10, right: 15}}
            >
                {!hidden ? <Chat /> : null}
                <BottomNavigation
                    value={value}
                    onChange={(e) => handleChange(e)}
                >
                    <BottomNavigationAction
                        sx={{ color: "#ce93d8"}}
                        icon={<ForumOutlinedIcon />}
                        label="Chat"
                        value="Chat"
                        onClick={() => setHidden(!hidden)}
                    />
                </BottomNavigation>
            </Box>
        </>
    );
};

export default Footer;