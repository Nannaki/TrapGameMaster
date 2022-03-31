import {Box, Button, Card, CardContent, Checkbox, Dialog, DialogContent, DialogTitle, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, ListItem, Typography} from "@mui/material"
import Header from "../components/Header";
import MeetingRoomOutlinedIcon from "@mui/icons-material/MeetingRoomOutlined";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {addRoomToUser, getUnmasterizedRoomsFromUser, getUserById, getUsers, reset} from "../features/auth/authSlice";
import BackspaceOutlinedIcon from "@mui/icons-material/BackspaceOutlined";
import {toast} from "react-toastify";
import Loading from "../components/Loading";
import AutoFixHighOutlinedIcon from '@mui/icons-material/AutoFixHighOutlined';
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import Footer from "../components/Footer";

//TODO change icons

const AddRoomToGm = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const {users, userInfo, isLoading, isSuccess, isError, unmasterized, message} = useSelector((state) => state.auth);
    const [roomChecked, setRoomChecked] = useState([]);
    let roomsToSend = [];

    const handleOpenModal = () => {setOpen(true)};
    const handleCloseModal = () => {setOpen(false)};

    useEffect(() => {
        dispatch(getUsers())

    }, [dispatch])

    useEffect(() => {
        if(isSuccess) {
            dispatch(getUsers())
            dispatch(reset())

        }

        if(isError) {
            handleCloseModal()
            toast.error(message)
            dispatch(getUsers())
            dispatch(reset())

        }

    },[isSuccess, isError, dispatch, message])

    const onCheckRoom = (e, value) => {
        e.preventDefault()

        let cloneRoomChecked = [...roomChecked];
        if(e.target.checked) {
            cloneRoomChecked.push(value)
            setRoomChecked(cloneRoomChecked)

        } else {
            cloneRoomChecked = roomChecked.filter((room) => {
                return room !== value

            });
            setRoomChecked(cloneRoomChecked);
        }
    }

    const OnSubmit = (e, id) => {
        e.preventDefault();

        for (let i= 0; i < roomChecked.length; i++) {
            roomsToSend.push(roomChecked[i])
        }

        const userData = {
            id,
            roomsToSend
        }

        dispatch(addRoomToUser(userData))
        handleCloseModal()
        setRoomChecked([])
    }

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
                    sx={{mt: 3, mb:3, color: 'white', textAlign: 'center', fontSize: {xs: '22px', md: 'xx-large'}, width: "100%"}}
                >
                    <MeetingRoomOutlinedIcon sx={{ fontSize: {xs: "20px", md: "xx-large"}}}/> Ajouter une salle à un GameMaster
                </Typography>
                { users.map((user) => (
                    <Card
                        sx={{ minWidth: {xs: 340, md: 400}, minHeight: {xs: 300, md: 350}, m:4, display: "flex", flexWrap: "wrap", justifyContent: "center"}}
                        key={user.name}
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
                                Salles masterisées :
                            </Typography>
                            { user.rooms.map((room) => (
                                <ListItem
                                    key={room}
                                    sx={{ my: 2, fontSize: {xs: "18px", md: "21px"}, display: "flex", justifyContent: "center"}}
                                    variant="outlined"
                                >
                                    {room}
                                </ListItem>
                            ))}
                            <div style={ {maxWidth: "345px", borderBottom: "1px solid #f1f1f1", marginTop:"15px"}}/>
                        </CardContent>
                        <span style={{ width: "100%"}}/>
                        <Button variant='contained'
                                color='primary'
                                sx={{ m: 3, p: 1, height: {xs: "28px", md: "35px"} }}
                                endIcon={<AutoFixHighOutlinedIcon />}
                                onClick={() => {dispatch(getUserById(user._id)) && dispatch(getUnmasterizedRoomsFromUser(user._id)) && handleOpenModal()}}
                        >
                            Ajouter
                        </Button>
                    </Card>
                ))}
                <span style={ {width: '100%' }} />
                <Button variant='contained'
                        color='secondary'
                        sx={{ mt: 1, mb: 4 }}
                        startIcon={<BackspaceOutlinedIcon />}
                        onClick={() => navigate('/gm')}
                >
                    Retour
                </Button>
                <Dialog
                    open={open}
                    component="form"
                    onSubmit={(e) => OnSubmit(e, userInfo._id)}
                >
                    <DialogTitle
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{mt: 1, mb:1, color: 'white', textAlign: 'center', fontSize: {xs: '18px', md: 'xx-large'}, width: "100%"}}
                    >
                        Ajouter une salle à {userInfo.name}
                    </DialogTitle>
                    <DialogContent
                        sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap", textAlign: "center"}}
                    >
                            <FormControl
                                color="secondary"
                                sx={{width: "50%" }}
                                >
                                <FormLabel
                                    component="legend"
                                    sx={{mb:2}}
                                >
                                    Salles disponibles
                                </FormLabel>
                                <FormGroup>
                                    {unmasterized.map((room) => (
                                        <FormControlLabel
                                            key={room}
                                            control={
                                                <Checkbox
                                                    checked={roomChecked.indexOf(room) > -1}
                                                    name="roomChecked"
                                                    color="secondary"
                                                    onChange={(e) => {onCheckRoom(e, room)}}
                                                    value={room}
                                                />
                                            }
                                        label={room}
                                        />
                                    ))}
                                </FormGroup>
                                <FormHelperText
                                    sx={{mt: 2}}
                                >
                                    Cocher les salles à ajouter au GM
                                </FormHelperText>
                            </FormControl>
                        <span style={ {width: '100%' }} />
                        <Button
                            variant='contained'
                            color='secondary'
                            startIcon={<BackspaceOutlinedIcon />}
                            onClick={() => handleCloseModal() && dispatch(reset())}
                            sx={{m:1}}
                        >
                            Retour
                        </Button>
                        <Button variant='contained'
                                color='success'
                                endIcon={<ExitToAppOutlinedIcon />}
                                type='submit'
                                sx={{m:1}}
                        >
                            Ajouter
                        </Button>
                    </DialogContent>

                </Dialog>
            </Box>
            <Footer />
        </>
    );
};

export default AddRoomToGm;