//Imports
import {Box, Card, CardContent, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import Header from "../components/Header";
import Loading from "../components/Loading";
import Footer from "../components/Footer";
import React, {useEffect} from "react";
import {getLastRecord} from "../features/auth/authSlice";


//Instanciation du composent
const DashBoardAdmin = () => {

    //Déclaration states et constantes
    const {user, isLoading, isError, lastUsers, message } = useSelector((state) => state.auth);
    const dispatch = useDispatch()

    //Charge les 3 derniers utilisateurs enregistrés en BDD
    useEffect(() => {
        dispatch(getLastRecord())
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
                sx={{display: "flex", justifyContent: "left", ml: 5, flexWrap: "wrap"}}
            >
                <Typography
                    variant='subtitle2'
                    noWrap
                    component='div'
                    sx={{width: "100%", mt: 3, color: 'white', fontSize: {xs: '18px', md: '22px'}}}
                >
                    Les nouveaux GameMaster chez TrapGame
                </Typography>
                <span style={{width: "100%"}}/>
                {lastUsers ? lastUsers.map((user) => (
                    <Card
                        key={user._id}
                        sx={{ width: {xs: 340, md: 300}, m:4, display: "flex", justifyContent: "center"}}
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
            <Footer/>
        </>
    );
};

export default DashBoardAdmin;