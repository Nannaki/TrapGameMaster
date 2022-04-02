//Imports
import React, {useEffect} from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getRooms } from "../store/slices/rooms/roomsSlice";
import Header from "../components/header/Header";
import {Box, Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material"
import MeetingRoomOutlinedIcon from '@mui/icons-material/MeetingRoomOutlined';
import Loading from "../components/utils/Loading";
import BackspaceOutlinedIcon from "@mui/icons-material/BackspaceOutlined";
import {getUserById} from "../store/slices/auth/authSlice";
import Footer from "../components/footer/Footer";

//Initialisation du composent
const ShowRooms = () => {

    //Initialisation des constantes et des states
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { rooms, isLoading } = useSelector((state) => state.rooms);
    const { user, userInfo} = useSelector((state) => state.auth)
    const id = JSON.parse(localStorage.getItem("user"))

    //Obtention des "rooms"
    //@ Dépendance: dispatch
    useEffect(() => {
        dispatch(getRooms());
    }, [dispatch])

    //Obtention d'un utilisateur avec son ID
    //@Dépendance: dispatch et ID
    useEffect(() => {
        dispatch(getUserById(id._id))
    }, [dispatch, id._id])


    //Composent de loadin
    if(isLoading) {
        return <Loading />
    }

//TODO Voir pour enregistrer image dans BDD, et voir pour bouton sous cartes
    //JSX
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
                    sx={{mt: 3, mb:3, color: 'white', textAlign: 'center', fontSize: {xs: '18px', md: 'xx-large'}, width: "100%"}}
                >
                    <MeetingRoomOutlinedIcon sx={{ fontSize: {xs: "18px", md: "xx-large"}}}/> Les salles actuelles
                </Typography>

                {user.isAdmin ? rooms.map((room) => (
                    <Card sx={{ width: 345, height: 400, m:4, overflow: "auto" }} key={room.name}>
                        <CardMedia
                            component="img"
                            height="250"
                            alt={room.name}
                            src="https://cdn.pixabay.com/photo/2016/01/22/11/50/live-escape-game-1155620_1280.jpg"
                        />
                        <CardContent>
                            <Typography
                                gutterBottom
                                variant="h5"
                                component="div"
                            >
                                {room.name}
                            </Typography>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                {room.description}
                            </Typography>
                        </CardContent>
                        <CardActions sx={{ textAlign: "center", display:"flex", justifyContent: "center" }}>
                            <Button
                                size="small"
                                color="secondary"
                            >
                                Brief
                            </Button>
                            <Button
                                size="small"
                                color="secondary"
                            >
                                Rangement
                            </Button>
                            <Button
                                size="small"
                                color="secondary"
                            >
                                Tips
                            </Button>
                        </CardActions>
                    </Card>
                )):userInfo.rooms ? userInfo.rooms.map((room) => (
                    <Card sx={{ width: 345, height: 400, m:4, overflow: "auto" }} key={room.name}>
                        <CardMedia
                            component="img"
                            height="140"
                            src="https://cdn.pixabay.com/photo/2016/01/22/11/50/live-escape-game-1155620_1280.jpg"
                            alt={room}
                        />
                        <CardContent>
                            <Typography
                                gutterBottom
                                variant="h5"
                                component="div"
                            >
                                {room}
                            </Typography>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                {room}
                            </Typography>
                        </CardContent>
                        <CardActions sx={{ textAlign: "center", display:"flex", justifyContent: "center" }}>
                            <Button
                                size="small"
                                color="secondary"
                            >
                                Brief
                            </Button>
                            <Button
                                size="small"
                                color="secondary"
                            >
                                Rangement
                            </Button>
                            <Button
                                size="small"
                                color="secondary"
                            >
                                Tips
                            </Button>
                        </CardActions>
                    </Card>
                )): <p></p>}
                <span style={ {width: '100%' }} />
                <Button variant='contained'
                        color='secondary'
                        sx={{ m: 3 }}
                        startIcon={<BackspaceOutlinedIcon />}
                        onClick={() => navigate('/')}
                >
                    Retour
                </Button>
            </Box>
            <Footer />
        </>
    );
};

export default ShowRooms;