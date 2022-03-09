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
    DialogTitle,
    TextField,
    DialogContent, Checkbox, FormControlLabel
} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {updateRoom, getRoomById, getRooms, reset} from "../features/rooms/roomsSlice";
import Loading from "../components/Loading";
import {toast} from "react-toastify";
import AutoFixHighOutlinedIcon from '@mui/icons-material/AutoFixHighOutlined';
import BackspaceOutlinedIcon from "@mui/icons-material/BackspaceOutlined";
import RoomPreferencesOutlinedIcon from '@mui/icons-material/RoomPreferencesOutlined';
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";

//TODO changer les icons


const ModifyRoom = () => {

    const { rooms, room, isLoading, isSuccess, isError, message } = useSelector((state) => state.rooms);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        isActive: false
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const { name, description, isActive } = formData;
    const { user } = useSelector((state)=> state.auth);
    const handleCloseModal = () => {setOpen(false)};
    const handleOpenModal = () => {setOpen(true)}


    useEffect(() => {
        dispatch(getRooms());
    }, [dispatch]);

    useEffect(() => {

        if(!user) {
            navigate('/')
        }

    }, [user, navigate, dispatch])


    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    };

    const onCheck = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.checked,
        }))
    };


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
                    component="form"
                    onSubmit={ (e) => {
                        e.preventDefault()

                        const roomData = {
                            name,
                            description,
                            isActive
                        }

                        dispatch(updateRoom({
                            data: roomData,
                            id: room._id
                        }));

                        if(isError) {
                            toast.error(message)
                        }

                        if(isSuccess) {
                            navigate('/rooms')
                            toast.success('La salle '+room.name+' a bien été mise à jour')

                        }

                    }}
                    onClose={handleCloseModal}
                    onBackdropClick={handleCloseModal}
                    sx={{ p:2, display: "flex", justifyContent: "center" }}
                >
                    <DialogTitle
                        variant='h6'
                        noWrap
                        component='div'
                        sx={{mt: 3, mb:3, color: 'white', textAlign: 'center', fontSize: {xs: '18px', md: 'xx-large'}, width: "100%"}}
                    >
                       Modifier {room.name}
                    </DialogTitle>
                    <DialogContent
                        sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap", textAlign: "center"}}
                    >
                        <TextField
                            sx={{ mt:2 }}
                            autoFocus
                            variant="outlined"
                            fullWidth
                            name="name"
                            label="nom"
                            value={name}
                            onChange={onChange}
                        />
                        <p> Donnée actuelle : {room.name}</p>
                        <span style={ {width: '100%' }} />
                        <TextField
                            sx={{ my:2 }}
                            variant="outlined"
                            multiline
                            fullWidth
                            name="description"
                            label="Description"
                            value={description}
                            onChange={onChange}
                        />
                        <p>Description actuelle : {room.description} </p>
                        <span style={ {width: '100%' }} />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    onChange={onCheck}
                                    id='isActive'
                                    value={isActive}
                                    name='isActive'
                                    checked={isActive}
                                />
                            }
                        label='Active' />
                        <span style={ {width: '100%' }} />
                        <Button variant='contained'
                                color='success'
                                sx={{ m: 3 }}
                                endIcon={<ExitToAppOutlinedIcon />}
                                type='submit'
                        >
                            Modifier
                        </Button>
                        <Button variant='contained'
                                color='secondary'
                                sx={{ m: 3 }}
                                endIcon={<BackspaceOutlinedIcon />}
                                onClick={handleCloseModal}
                        >
                            Retour
                        </Button>
                    </DialogContent>
                </Dialog>
            </Box>
        </>
    );
};

export default ModifyRoom;