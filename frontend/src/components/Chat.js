import {Chip, Stack, Typography, Box, Paper, Container, FormHelperText} from "@mui/material";
import React from "react";
import {useSelector} from "react-redux";


const Chat = () => {

    const {user} = useSelector(state => state.auth)

    return (
        <>
            <Box
                sx={{p:2, position: "absolute", bottom: 75, right: 20, display:"flex", justifyContent: "center", flexWrap: "wrap", border: "1px solid #ce93d8", borderRadius: "20px", width: {xs:"250px", md: "300px"},}}
            >
                <Typography
                    variant='h6'
                    noWrap
                    component='div'
                    sx={{my: 2, borderBottom: "0.5px solid white", color: 'white', textAlign: 'center', fontSize: {xs: '16px', md: '20px'}, width: "80%", cursor:"default"}}
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
                            label="Admin"
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
                        sx={{my: 2,mr: 6, p:1 ,border: "0.5px solid #43a047", borderRadius: "20px", display: "flex",  flexWrap: "wrap", width: "80%"}}
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
                        sx={{my: 2, ml:6, p:1 ,border: "0.5px solid #ffa000", borderRadius: "20px", display: "flex", justifyContent: "right", flexWrap: "wrap", width: "80%"}}
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
            </Box>
        </>
    );
};

export default Chat;