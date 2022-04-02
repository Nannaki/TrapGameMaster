//Imports
import {Box, Card, CardContent, CardMedia, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import Header from "../components/Header";
import Loading from "../components/Loading";
import Footer from "../components/Footer";
import React, {useEffect} from "react";
import {getLastRecord} from "../features/auth/authSlice";
import {getLastRecordsRoom} from "../features/rooms/roomsSlice";


//Instanciation du composent
const DashBoardAdmin = () => {

    //Déclaration states et constantes
    const {user, isLoading, lastUsers} = useSelector((state) => state.auth);
    const {lastRooms} = useSelector(state => state.rooms)
    const dispatch = useDispatch()

    //Charge les 3 derniers utilisateurs enregistrés en BDD
    useEffect(() => {
        dispatch(getLastRecord())
    }, [])

    //Charge les 3 dernières salles enregistrées en BDD
    useEffect(() => {
        dispatch(getLastRecordsRoom())
    }, [])

    //Composent de chargement
    if(isLoading) {
        return <Loading />
    }

    //JSX
    return (
        <>
            <Header/>
            <Box
                sx={{ mt: 12, display: "flex", justifyContent: "center", flexWrap: 'wrap', textAlign: 'center' }}
            >
                <Typography
                    variant='h1'
                    noWrap
                    component='div'
                    sx={{width: "100%", mt: 3, mb:3, color: 'white', textAlign: 'center', fontSize: {xs: '28px', md: '40px'}}}
                >
                    Bonjour {user ? user.name : null}
                </Typography>
            </Box>
            <Box
                sx={{display: "flex", justifyContent: {xs: "center", md: "left"}, ml: "5%", flexWrap: "wrap"}}
            >
                <Typography
                    variant='subtitle2'
                    noWrap
                    component='div'
                    sx={{ mt: {xs:3, md:10}, color: 'white', fontSize: {xs: '18px', md: '22px'}, borderBottom: "1px solid #ce93d8"}}
                >
                    Les nouveaux GameMaster chez TrapGame
                </Typography>
                <span style={{width: "100%"}}/>
                {lastUsers ? lastUsers.map((user) => (
                    <Card
                        key={user._id}
                        sx={{ width: {xs: 220, md: 350}, m:4, display: "flex", justifyContent: {xs: "center", md: "left"}}}
                        square
                    >
                        <CardContent>
                            <Typography
                                sx={{ mb: 2, fontSize: {xs: '18px', md: '22px'} }}
                                variant="h5"
                                component="div"
                            >
                                {user.name}
                            </Typography>
                            <div style={ {maxWidth: "345px", borderBottom: "1px solid #f1f1f1"}}/>
                            <Typography
                                component="div"
                                sx={{ mt: 2, fontSize: {xs: '16px', md: '18px'} }}
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
                                sx={{ mt: 2, fontSize: {xs: '16px', md: '18px'} }}
                                color="secondary"
                            >
                                Salles masterisées :
                            </Typography>
                            {user.rooms.map((room) => (
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
                )) : null}
            </Box>
            <Box
                sx={{display: "flex", justifyContent: {xs: "center", md: "left"}, ml: {xs: "5%", md: "5%", lg: "10%"}, flexWrap: "wrap"}}
            >
                <Typography
                    variant='subtitle2'
                    noWrap
                    component='div'
                    sx={{ mt: 3, color: 'white', fontSize: {xs: '18px', md: '22px'}, borderBottom: "1px solid #ce93d8"}}
                >
                    Les nouvelles salles chez TrapGame
                </Typography>
                <span style={{width: "100%"}}/>
                {lastRooms.map((room) => (
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
                            <div style={ {maxWidth: "345px", borderBottom: "1px solid #f1f1f1", marginTop:"15px"}}/>
                    </Card>
                ))}
            </Box>
            <Footer/>
        </>
    );
};

export default DashBoardAdmin;