//Imports
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {getRooms, deleteRoom} from "../../store/slices/rooms/roomsSlice";
import {Box, IconButton, List, ListItem, Typography, Paper, Card, Button} from "@mui/material";
import NoMeetingRoomOutlinedIcon from '@mui/icons-material/NoMeetingRoomOutlined';
import React, {useEffect} from "react";
import Header from "../../components/header/Header";
import BackspaceOutlinedIcon from "@mui/icons-material/BackspaceOutlined";
import Loading from "../../components/utils/Loading";
import Footer from "../../components/footer/Footer";

//Instanciation du composent
const DeleteRoom = () => {

    //Déclaration de constante et states
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { rooms, isLoading } = useSelector((state) => state.rooms);
    const { user } = useSelector((state)=> state.auth);

    //Charge les rooms depuis la BDD pour redux
    //Dépendance: dispatch
    useEffect(() => {
        dispatch(getRooms());
    }, [dispatch])

    //Composent de chargement
    if(isLoading) {
        return <Loading />
    }

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
                    <NoMeetingRoomOutlinedIcon sx={{ fontSize: {xs: "18px", md: "xx-large"}}}/> Supprimer une salle du système
                </Typography>
                <Paper elevation={6} sx={{ width: {xs: "225px", md: "300px"} }}>
                    <List>
                        {rooms.map((room) => (
                            <Card
                                key={room.name}
                                sx={{ maxWidth: 345, m:4, border: "1px solid #f2f2f2"}}
                                elevation={18}
                            >
                                <ListItem
                                    sx={{ my: 2, fontSize: {xs: "18px", md: "21px"}, display: "flex", justifyContent: "center"}}
                                    variant="outlined"
                                    secondaryAction={
                                    <IconButton
                                        onClick={user.isAdmin ? () => {dispatch(deleteRoom(room._id)) && toast.success('La salle '+room.name+' a bien été supprimée')}: () => {navigate('/')}}
                                        variant="outlined"
                                        color="error"
                                        edge="end"
                                        aria-label="delete">
                                        <NoMeetingRoomOutlinedIcon sx={{ fontSize: {xs: "28px", md: "xx-large"}}} color = "error"/>
                                    </IconButton>
                                }
                                >
                                    {room.name}
                                </ListItem>
                            </Card>
                        ))}
                            </List>
                        <Button
                            variant='contained'
                            color='secondary'
                            sx={{ mb: 3 }}
                            startIcon={<BackspaceOutlinedIcon />}
                            onClick={() => navigate('/rooms')}
                        >
                            Retour
                        </Button>
                </Paper>
            </Box>
            <Footer />
        </>
    );
};

export default DeleteRoom;