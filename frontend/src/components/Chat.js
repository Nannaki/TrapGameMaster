import {Chip, Stack, Typography, Box, Paper, Container, FormHelperText, TextField, Button} from "@mui/material";
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import {useSelector} from "react-redux";
import {useWebSocket} from "../WebsocketContext";
import {useEffect, useState} from "react";


const Chat = () => {

    const {user} = useSelector(state => state.auth);
    const {ws} = useWebSocket();
    const [currentMessage, setCurrentMessage] = useState("");
    const [room, setRoom] = useState("")

    useEffect(() => {
        if(user.isAdmin === true) {
            setRoom("Admin")
        }
        else {
            setRoom("GM")
        }

        console.log(room)
    }, [user, room])

    const sendMessage = async () => {

        if(currentMessage !== "") {
            const messageData = {
                room: room,
                author: user.name,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ":" +new Date(Date.now()).getMinutes(),
            };
            await ws.emit("send_message", messageData);
            setCurrentMessage("")
        }
    }

    useEffect(() => {
        ws.on("receive_message", (data) => {
            console.log(data) //TODO T'EN ES ICI 39.47 sur vidéo
        })
    }, [ws])


    return (
        <>
            <Box
                sx={{p:2, position: "absolute", bottom: 75, right: 20, display:"flex", justifyContent: "center", flexWrap: "wrap", border: "1px solid #ce93d8", borderRadius: "20px", width: {xs:"280px", md: "350px"},}}
            >
                <Typography
                    variant='h6'
                    noWrap
                    component='div'
                    sx={{mb: 2, borderBottom: "0.5px solid white", color: 'white', textAlign: 'center', fontSize: {xs: '16px', md: '20px'}, width: "80%", cursor:"default"}}
                >
                    ChatMaster
                </Typography>
                <Box
                    sx={{display:"flex", justifyContent: "center", flexWrap: "wrap", width: "100%"}}
                >
                    {user.isAdmin ? (
                    <Stack
                        direction="row"
                        spacing={2}
                        sx={{my: 2}}
                    >
                        <Chip
                            label={"Admin"}
                            color="info"
                            variant="contained"
                        />
                        <Chip
                            label="Admin - GM"
                            color="primary"
                            variant="contained"
                        />

                    </Stack>
                        ):(
                    <Stack
                        direction="row"
                        spacing={2}
                        sx={{my:2}}
                    >
                        <Chip
                            label="GM"
                            color="error"
                            variant="contained"
                        />
                        <Chip
                            label="GM - Admin"
                            color="primary"
                            variant="contained"
                        />
                    </Stack>
                )}
                </Box>
                <Container
                    variant="outlined"
                    sx={{my: 2, border: "1px solid white", display: "flex", flexWrap: "wrap", justifyContent: "center"}}
                >
                    <Paper
                        variant="outlined"
                        sx={{my: 2,mr: 6, p:1 ,border: "0.5px solid #43a047", borderRadius: "10px", display: "flex",  flexWrap: "wrap", width: "80%"}}
                    >
                        <Typography
                            variant="body2"
                            sx={{textAlign: "left"}}
                        >
                            Coucou
                        </Typography>
                        <span style={{width: "100%"}}/>
                        <FormHelperText
                            sx={{fontSize: "10px", textAlign: "left"}}
                        >
                            Jul | 24.03: 12:00
                        </FormHelperText>
                    </Paper>
                    <span style={{width: "100%"}}/>
                    <Paper
                        variant="outlined"
                        sx={{my: 2, ml:6, p:1 ,border: "0.5px solid #fafafa", borderRadius: "10px", display: "flex", justifyContent: "right", flexWrap: "wrap", width: "80%"}}
                    >
                        <Typography
                            variant="body2"
                            sx={{textAlign: "right"}}
                        >
                            Coucou
                        </Typography>
                        <span style={{width: "100%"}}/>
                        <FormHelperText
                            sx={{fontSize: "10px", textAlign: "right"}}
                        >
                            Jul | 24.03: 12:10
                        </FormHelperText>
                    </Paper>
                </Container>
                <Box
                    sx={{display: "flex", flexWrap: "noWrap", justifyContent: "center"}}
                >
                    <TextField
                        label="Message"
                        variant="outlined"
                        color="secondary"
                        name="sendMessage"
                        multiline
                        sx={{my:2}}
                        onChange={(e) => {
                            setCurrentMessage(e.target.value)
                        }}

                    />
                    <Button
                        sx={{fontSize: {xs: "34px", md: "38px"}, my:2}}
                        color="secondary"
                        onClick={sendMessage}
                    >
                        <ArrowCircleRightOutlinedIcon fontSize={"inherit"}/>
                    </Button>
                </Box>

            </Box>
        </>
    );
};

export default Chat;