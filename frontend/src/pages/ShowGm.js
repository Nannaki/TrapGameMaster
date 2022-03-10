import {Box, Button, Card, CardContent, Typography} from "@mui/material"
import Header from "../components/Header";
import MeetingRoomOutlinedIcon from "@mui/icons-material/MeetingRoomOutlined";
import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getUsers, reset} from "../features/auth/authSlice";
import BackspaceOutlinedIcon from "@mui/icons-material/BackspaceOutlined";

//TODO change icons

const ShowGm = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {users, isLoading} = useSelector((state) => state.auth)


    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch])


    return (
        <>
            <Header />
            <Box
                sx={{ mt: 12, display: "flex", justifyContent:'center', alignItems: 'center', flexWrap: 'wrap', textAlign: 'center' }}
            >
                <Typography
                    variant='h6'
                    noWrap
                    component='div'
                    sx={{mt: 3, mb:3, color: 'white', textAlign: 'center', fontSize: {xs: '22px', md: 'xx-large'}, width: "100%"}}
                >
                    <MeetingRoomOutlinedIcon sx={{ fontSize: {xs: "20px", md: "xx-large"}}}/> Les GameMaster
                </Typography>
                { users.map((user) => (
                    <Card
                        sx={{ maxWidth: {xs: 340, md: 500}, m:4}} key={user.name}
                        square
                    >
                        <CardContent>
                            <Typography
                                sx={{ mb: 2, fontSize: {xs: '22px', md: 'x-large'} }}
                                variant="h5"
                                component="div"
                            >
                                {user.name}
                            </Typography>
                            <div style={ {maxWidth: "345px", borderBottom: "1px solid #f1f1f1"}}/>
                            <Typography
                                component="div"
                                sx={{ mt: 2, fontSize: {xs: '18px', md: 'large'} }}
                                color="secondary"
                            >
                                Adresse email :
                            </Typography>
                            <Typography
                                variant="h6"
                                component="div"
                                sx={{ mb: 2, fontSize: {xs: '16px', md: 'medium'} }}
                            >
                               {user.email}
                            </Typography>
                            <div style={ {maxWidth: "345px", borderBottom: "1px solid #f1f1f1"}}/>
                            <Typography
                                component="div"
                                sx={{ mt: 2, fontSize: {xs: '18px', md: 'large'} }}
                                color="secondary"
                            >
                                Salles masterisées :
                            </Typography>
                            { user.rooms.map((room) => (
                                <Typography
                                    key={room}
                                    component="div"
                                    sx={{ mb: 1, fontSize: {xs: '16px', md: 'medium'} }}
                                >
                                    {room}
                                </Typography>
                            ))}
                            <div style={ {maxWidth: "345px", borderBottom: "1px solid #f1f1f1", marginTop:"15px"}}/>
                        </CardContent>
                    </Card>
                ))}
                <span style={ {width: '100%' }} />
                <Button variant='contained'
                        color='secondary'
                        sx={{ m: 3 }}
                        endIcon={<BackspaceOutlinedIcon />}
                        onClick={() => navigate('/gm')}
                >
                    Retour
                </Button>
            </Box>
        </>
    );
};

export default ShowGm;