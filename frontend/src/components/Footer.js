import {BottomNavigation, BottomNavigationAction, Box} from "@mui/material";
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import {useState} from "react";
import Chat from "./Chat";


const Footer = () => {

    const [hidden, setHidden] = useState(true);
    const [value, setValue] = useState('Chat');

    const handleChange = (event, newValue) => {
        if(value === 'Chat') {
            setValue('')
        }
        else {
            setValue('Chat')
        }
    };

    return (
        <>
            <Box
                sx={{width: {xs: "250px", md: "350px"}, position: "absolute", bottom: 10, right: 1}}
            >
                {!hidden ? <Chat/> : null}
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