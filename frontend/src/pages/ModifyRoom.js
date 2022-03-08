import Header from "../components/Header";
import {
    Box,
    Typography,
    Paper,
    Card,
    ListItem,
    IconButton,
    List,
    Button,
    Dialog,
    Slide,
    DialogTitle
} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getRoomById, getRooms, reset} from "../features/rooms/roomsSlice";
import Loading from "../components/Loading";
import {toast} from "react-toastify";
import AutoFixHighOutlinedIcon from '@mui/icons-material/AutoFixHighOutlined';
import BackspaceOutlinedIcon from "@mui/icons-material/BackspaceOutlined";
import RoomPreferencesOutlinedIcon from '@mui/icons-material/RoomPreferencesOutlined';

//TODO changer les icons


const ModifyRoom = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const { rooms, room, isLoading } = useSelector((state) => state.rooms);
    const { user } = useSelector((state)=> state.auth);
    const handleCloseModal = () => {setOpen(false)};
    const handleOpenModal = () => {setOpen(true)}


    useEffect(() => {
        dispatch(getRooms());
    }, [dispatch])


    if(isLoading) {
        return <Loading />
    }


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
                    <RoomPreferencesOutlinedIcon sx={{ fontSize: {xs: "18px", md: "xx-large"}}}/> Modifier un salle du système
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
                                            onClick={()=>dispatch(getRoomById(room._id)) && handleOpenModal()}
                                            variant="outlined"
                                            color="secondary"
                                            edge={"end"}
                                            aria-label="delete">
                                            <AutoFixHighOutlinedIcon />
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
                        endIcon={<BackspaceOutlinedIcon />}
                        onClick={() => navigate('/rooms')}
                    >
                        Retour
                    </Button>
                </Paper>
                <Dialog
                    open={open}
                    onClose={handleCloseModal}
                    onBackdropClick={handleCloseModal}
                >
                    <DialogTitle
                        variant='h6'
                        noWrap
                        component='div'
                        sx={{mt: 3, mb:3, color: 'white', textAlign: 'center', fontSize: {xs: '18px', md: 'xx-large'}, width: "100%"}}
                    >
                        {room.name}
                    </DialogTitle>

                </Dialog>
            </Box>
        </>
    );
};

export default ModifyRoom;