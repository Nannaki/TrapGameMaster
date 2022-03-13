import {Box, Button, Card, CardContent, IconButton, ListItem, Typography} from "@mui/material"
import Header from "../components/Header";
import MeetingRoomOutlinedIcon from "@mui/icons-material/MeetingRoomOutlined";
import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {deleteRoomOfUser, getUsers, reset} from "../features/auth/authSlice";
import BackspaceOutlinedIcon from "@mui/icons-material/BackspaceOutlined";
import {toast} from "react-toastify";
import DeleteIcon from "@mui/icons-material/Delete";
import Loading from "../components/Loading";
import AutoFixHighOutlinedIcon from '@mui/icons-material/AutoFixHighOutlined';

//TODO change icons

const AddRoomToGm = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {users, isLoading, isSuccess} = useSelector((state) => state.auth)


    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch])

    useEffect(() => {
        if(isSuccess) {
            dispatch(getUsers())
        }

        dispatch(reset())
    },[isSuccess, dispatch])

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
                                color='secondary'
                                sx={{ m: 3, p: 1, height: {xs: "28px", md: "35px"} }}
                                endIcon={<AutoFixHighOutlinedIcon />}
                        >
                            Modifier
                        </Button>
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

export default AddRoomToGm;