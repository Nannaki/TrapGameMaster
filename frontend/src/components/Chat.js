//Imports
import {Chip, Stack, Typography, Box, Paper, Container, FormHelperText, TextField, Button} from "@mui/material";
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import ScrollToBottom from "react-scroll-to-bottom";
import {useDispatch, useSelector} from "react-redux";
import {useWebSocket} from "../WebsocketContext";
import {useEffect, useState} from "react";
import {getMessages} from "../features/auth/authSlice";

//Instanciation du composent
const Chat = () => {

    //Déclarations de constantes et states
    const {user, chatMessages} = useSelector(state => state.auth);
    const {ws} = useWebSocket();
    const dispatch = useDispatch();
    const [currentMessage, setCurrentMessage] = useState("");
    const [room, setRoom] = useState("");
    const [messageList, setMessageList] = useState([]);

    //Charge les conversations d'un utilisateur selon son id
    useEffect(() => {
        dispatch(getMessages({id:user._id}))
    }, [])

    //Permet de déterminer la room (Socket.io) de l'utilisateur
    //@Dépendance: user, room
    useEffect(() => {

        if(user.isAdmin === true) {
            setRoom("Admin")
        }
        else {
            setRoom("GM")
        }

    }, [user, room])


    //Permet de gérer l'envoie d'un message dans le chat depuis l'input
    const sendMessage = async (e) => {
        e.preventDefault();

        if(currentMessage !== "") {
            const messageData = {
                room: room,
                author: user.name,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ":" +new Date(Date.now()).getMinutes(),
            };
            await ws.emit("send_message", messageData);
            setMessageList((list) => [...list, messageData]);
            setCurrentMessage("")
        }
    }

    //Permet d'afficher les messages reçus dans le chat
    useEffect(() => {
        ws.on("receive_message", (data) => {
            setMessageList((list) => [...list, data]);
        })
    }, [ws])

    //JSX
    return (
        <>
            <Box
                sx={{p:2, position: "fixed", bottom: 75, right: 20, display:"flex", justifyContent: "center", flexWrap: "wrap", backgroundColor: "#171717", border: "1px solid #ce93d8", width: {xs:"280px", md: "350px"}}}
            >
                <Typography
                    variant='h6'
                    noWrap
                    component='div'
                    sx={{ borderBottom: "0.5px solid white", color: 'white', textAlign: 'center', fontSize: {xs: '16px', md: '20px'}, width: "80%", cursor:"default"}}
                >
                    ChatMaster
                </Typography>
                <Box
                    sx={{display:"flex", justifyContent: "center", flexWrap: "wrap", width: "100%", borderBottom: "1px solid white"}}
                >
                    {user.isAdmin ? (
                    <Stack
                        direction="row"
                        spacing={2}
                        sx={{my: 2}}
                    >
                        <Chip
                            label="Admin"
                            color="info"
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
                            sx={{ backgroundColor: "#8d6e63"}}
                            variant="contained"
                        />
                    </Stack>
                )}
                </Box>
                <ScrollToBottom className="message-container">
                    <Container sx={{maxHeight: "30vh"}}>
                        {chatMessages.map((message, index) => (
                            <Box
                                key={user._id+index}
                                sx={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}
                            >
                                {message.author === user.name ? (
                                    <Paper
                                        key={user._id}
                                        variant="outlined"
                                        sx={{my: 2, ml:8, p:1, border: "0.5px solid #ffd54f", borderRadius: "10px" ,  width: "80%", wordWrap: "break-word"}}
                                    >
                                        <Typography
                                            key={user.name}
                                            variant="body2"
                                            sx={{textAlign: "right"}}
                                            className="message-container"
                                        >
                                            {message.message}
                                        </Typography>
                                        <span key={user.email} style={{width: "100%"}}/>
                                        <FormHelperText
                                            key={index}
                                            sx={{fontSize: "10px", textAlign: "right"}}
                                        >
                                            {"Vous à " + message.time }
                                        </FormHelperText>
                                    </Paper>
                                ):(
                                    <Paper
                                        key={user._id}
                                        variant="outlined"
                                        sx={{my: 2, mr:8, p:1, border: "0.5px solid #43a047",  borderRadius: "10px", width: "80%", wordWrap: "break-word"}}
                                    >
                                        <Typography
                                            key={user.email}
                                            variant="body2"
                                            sx={{textAlign:"left"}}
                                            className="message-container"
                                            paragraph={true}
                                        >
                                            {message.message}
                                        </Typography>
                                        <span key={user.name} style={{width: "100%"}}/>
                                        <FormHelperText
                                            key={index}
                                            sx={{fontSize: "10px", textAlign: "left"}}
                                        >
                                            {message.author + " à " + message.time }
                                        </FormHelperText>
                                    </Paper>
                                )}
                            </Box>
                        ))}
                        {messageList.map((messageContent, index) => (
                            <Box
                                sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center"}}
                                key={user._id+index}
                            >
                            {messageContent.author === user.name ? (
                                <Paper
                                    key={user._id}
                                    variant="outlined"
                                    sx={{my: 2, ml:4, p:1, border: "0.5px solid #ffd54f", borderRadius: "10px" , width: "80%", wordWrap: "break-word"}}
                                >
                                    <Typography
                                        key={user.email}
                                        variant="body2"
                                        sx={{textAlign: "right"}}
                                        className="message-container"
                                    >
                                        {messageContent.message}
                                    </Typography>
                                    <span key={user.name} style={{width: "100%"}}/>
                                    <FormHelperText
                                        key={index}
                                        sx={{fontSize: "10px", textAlign: "right"}}
                                    >
                                        {"Vous à " + messageContent.time }
                                    </FormHelperText>
                                </Paper>
                                ):(
                                <Paper
                                    key={user._id}
                                    variant="outlined"
                                    sx={{my: 2, mr:4, p:1, border: "0.5px solid #43a047",  borderRadius: "10px", width: "80%", wordWrap: "break-word"}}
                                >
                                    <Typography
                                        key={user.name}
                                    variant="body2"
                                    sx={{textAlign:"left"}}
                                    className="message-container"
                                    >
                                        {messageContent.message}
                                    </Typography>
                                    <span key={user.email} style={{width: "100%"}}/>
                                    <FormHelperText
                                        key={index}
                                        sx={{fontSize: "10px", textAlign: "left"}}
                                    >
                                        {messageContent.author + " à " + messageContent.time }
                                    </FormHelperText>
                                </Paper>
                            )}
                            </Box>
                            ))}
                    <span style={{width: "100%"}}/>
                    </Container>
                </ScrollToBottom>
                <Box
                    sx={{display: "flex", flexWrap: "noWrap", justifyContent: "center"}}
                    component="form"
                >
                    <TextField
                        label="Message"
                        variant="outlined"
                        color="secondary"
                        name="sendMessage"
                        value={currentMessage}
                        multiline
                        maxRows={4}
                        sx={{my:2, overflow: "auto"}}
                        onChange={(e) => {
                            setCurrentMessage(e.target.value)
                        }}
                        onKeyPress={(e) => {e.key=== "Enter" &&sendMessage(e)}}

                    />
                    <Button
                        sx={{fontSize: {xs: "34px", md: "38px"}, my:2}}
                        color="secondary"
                        onClick={(e) => sendMessage(e)}
                        type="submit"
                    >
                        <ArrowCircleRightOutlinedIcon fontSize={"inherit"}/>
                    </Button>
                </Box>
            </Box>
        </>
    );
};

export default Chat;