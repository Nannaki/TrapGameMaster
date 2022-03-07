import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import Header from "../components/Header";
import {Typography, Box, Button, Card, CardContent} from "@mui/material";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import BackspaceOutlinedIcon from "@mui/icons-material/BackspaceOutlined";
import MeetingRoomOutlinedIcon from '@mui/icons-material/MeetingRoomOutlined';
import NoMeetingRoomOutlinedIcon from '@mui/icons-material/NoMeetingRoomOutlined';
import Loading from "../components/Loading";
import React from "react";

const Rooms = () => {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    const { isLoading } = useSelector((state) => state.rooms)

    if(isLoading) {
        return <Loading />
    }

    if(user.isAdmin) {
        return (
            <>
                <Header />
                <Box sx={{ mt: 12, display: "flex", justifyContent:'center', alignItems: 'center', flexWrap: 'wrap', textAlign: 'center' }}>
                    <Card
                        elevation={8}
                        square
                        sx={{ width: {xs: "280px", md: "600px"}, display: "flex", flexWrap: "wrap", justifyContent:'center', alignItems: 'center' }}>
                        <CardContent>
                            <Typography
                                variant='h6'
                                noWrap
                                component='div'
                                sx={{mt: 3, color: 'white', textAlign: 'center', fontSize: {xs: '18px', md: 'xx-large'}}}
                            >
                                Gestion des salles
                            </Typography>
                        </CardContent>
                        <span style={ {width: '100%' }} />
                        <Button
                            startIcon={<VisibilityOutlinedIcon />}
                            variant="outlined"
                            color="third"
                            sx={{ p: 2, mt: 3, width: {xs: "180px", md: "350px"}, fontSize: {xs: '11px', md: '14px'}}}
                            onClick={() => navigate('/showrooms')}
                        >
                            Voir les salles
                        </Button>
                        <span style={ {width: '100%' }} />
                        <Button
                            startIcon={<EditOutlinedIcon />}
                            variant="outlined"
                            color="third"
                            sx={{ p: 2, mt: 3, width: {xs: "180px", md: "350px"}, fontSize: {xs: '11px', md: '14px'}}}
                        >
                            Modifier une salle
                        </Button>
                        <span style={ {width: '100%' }} />
                        <Button
                            startIcon={<MeetingRoomOutlinedIcon />}
                            variant="outlined"
                            color="third"
                            sx={{ p: 2, mt: 3, width: {xs: "180px", md: "350px"}, fontSize: {xs: '11px', md: '14px'}}}
                        >
                            Ajouter une salle dans le système
                        </Button>
                        <span style={ {width: '100%' }} />
                        <Button
                            startIcon={<NoMeetingRoomOutlinedIcon />}
                            variant="outlined"
                            color="third"
                            sx={{ p: 2, mt: 3, mb: 3, width: {xs: "180px", md: "350px"}, fontSize: {xs: '11px', md: '14px'}}}
                            onClick={() => navigate('/deleteRoom')}
                        >
                            Supprimer une salle du système
                        </Button>
                        <span style={ {width: '100%' }} />
                        <Button
                            variant='contained'
                            color='secondary'
                            sx={{ m: 3 }}
                            endIcon={<BackspaceOutlinedIcon />}
                            onClick={() => navigate('/dashboardadmin')}
                        >
                            Retour
                        </Button>
                    </Card>
                </Box>
            </>
        );

    } else {
        return (
            <>
                <Header />
                <Typography
                    variant='h6'
                    noWrap
                    component='div'
                    sx={{mt: 3, color: 'white', textAlign: 'center', fontSize: {xs: 'medium', md: 'xx-large'}}}
                >
                    Les salles
                </Typography>
            </>
        )
    }
}



export default Rooms;