//Imports
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import Header from "../components/Header";
import {Typography, Box, Button, Card, CardContent} from "@mui/material";
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import PersonRemoveOutlinedIcon from '@mui/icons-material/PersonRemoveOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import BackspaceOutlinedIcon from "@mui/icons-material/BackspaceOutlined";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import NoMeetingRoomOutlinedIcon from '@mui/icons-material/NoMeetingRoomOutlined';
import MeetingRoomOutlinedIcon from '@mui/icons-material/MeetingRoomOutlined';
import Loading from "../components/Loading";
import React from "react";
import Footer from "../components/Footer";

//Instanciation du composent
const Gm = () => {

    //Déclaration des constantes et states
    const navigate = useNavigate();
    const {user, isLoading} = useSelector((state) => state.auth);

    //Composent de chargement
    if(isLoading) {
        return <Loading />
    }


    //JSX
    return (
        <>
            <Header />
            <Box sx={{ mt: 12, display: "flex", justifyContent:'center', alignItems: 'center', flexWrap: 'wrap', textAlign: 'center' }}>
                <Card
                    elevation={8}
                    square
                    sx={{ width: {xs: "280px", md: "600px"}, display: "flex", flexWrap: "wrap", justifyContent:'center', alignItems: 'center' }}
                >
                    <CardContent>
                        <Typography
                            variant='h6'
                            noWrap
                            component='div'
                            sx={{mt: 3, color: 'white', textAlign: 'center', fontSize: {xs: '18px', md: 'xx-large'}}}
                        >
                            Gestion des GameMaster
                        </Typography>
                    </CardContent>
                    <span style={ {width: '100%' }} />
                    <Button
                        startIcon={<VisibilityOutlinedIcon />}
                        variant="outlined"
                        color="third"
                        sx={{ p: 2, mt: 3, width: {xs: "180px", md: "350px"}, fontSize: {xs: '11px', md: '14px'}}}
                        onClick={user.isAdmin ? () => navigate('/showgm'): () => navigate('/')}
                    >
                        Voir les GM
                    </Button>
                    <span style={ {width: '100%' }} />
                    <Button
                        startIcon={<EditOutlinedIcon />}
                        variant="outlined"
                        color="third"
                        sx={{ p: 2, mt: 3, width: {xs: "180px", md: "350px"}, fontSize: {xs: '11px', md: '14px'}}}
                        onClick={user.isAdmin ? () => navigate('/modifygm'): () => navigate('/')}
                    >
                        Modifier un GM dans le système
                    </Button>
                    <span style={ {width: '100%' }} />
                    <Button
                        startIcon={<PersonAddAltOutlinedIcon />}
                        variant="outlined"
                        color="third"
                        sx={{ p: 2, mt: 3, width: {xs: "180px", md: "350px"}, fontSize: {xs: '11px', md: '14px'}}}
                        onClick={user.isAdmin ? () => navigate('/registergm'): () => navigate('/')}
                    >
                        Ajouter un GM dans le système
                    </Button>
                    <span style={ {width: '100%' }} />
                    <Button
                        startIcon={<PersonRemoveOutlinedIcon />}
                        variant="outlined"
                        color="third"
                        sx={{ p: 2, mt: 3, width: {xs: "180px", md: "350px"}, fontSize: {xs: '11px', md: '14px'}}}
                        onClick={user.isAdmin ? () => navigate('/deletegm'): () => navigate('/')}
                    >
                        Retirer un GM du système
                    </Button>
                    <span style={ {width: '100%' }} />
                    <Button
                        startIcon={<MeetingRoomOutlinedIcon />}
                        variant="outlined"
                        color="third"
                        sx={{ p: 2, mt: 3, width: {xs: "180px", md: "350px"}, fontSize: {xs: '11px', md: '14px'}}}
                        onClick={user.isAdmin ? () => navigate('/addroomtogm') : () => navigate('/')}
                    >
                        Ajouter une salle au un GM
                    </Button>
                    <span style={ {width: '100%' }} />
                    <Button
                        startIcon={<NoMeetingRoomOutlinedIcon />}
                        variant="outlined"
                        color="third"
                        sx={{ p: 2, mt: 3, mb: 3,  width: {xs: "180px", md: "350px"}, fontSize: {xs: '11px', md: '14px'}}}
                        onClick={user.isAdmin ? () => navigate('/deleteroomofgm'): () => navigate('/')}
                    >
                        Retirer une salle au GM
                    </Button>
                    <span style={ {width: '100%' }} />
                    <Button
                        variant='contained'
                        color='secondary'
                        sx={{ m: 3 }}
                        startIcon={<BackspaceOutlinedIcon />}
                        onClick={() => navigate('/')}
                    >
                        Retour
                    </Button>
                </Card>
            </Box>
            <Footer />
        </>
    );
};

export default Gm;