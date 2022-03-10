import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import Header from "../components/Header";
import {Typography, Box, Button, Card, CardContent} from "@mui/material";
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import PersonRemoveOutlinedIcon from '@mui/icons-material/PersonRemoveOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import BackspaceOutlinedIcon from "@mui/icons-material/BackspaceOutlined";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import Loading from "../components/Loading";
import React from "react";


const Gm = () => {
    const navigate = useNavigate();
    const {user, isLoading} = useSelector((state) => state.auth);

    if(isLoading) {
        return <Loading />
    }

    if (user.isAdmin) {
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
                            startIcon={<PersonAddAltOutlinedIcon />}
                            variant="outlined"
                            color="third"
                            sx={{ p: 2, mt: 3, width: {xs: "180px", md: "350px"}, fontSize: {xs: '11px', md: '14px'}}}
                            onClick={user.isAdmin ? () => navigate('/registergm'): () => navigate('/')}
                        >
                            Ajouter un GM dans le sytème
                        </Button>
                        <span style={ {width: '100%' }} />
                        <Button
                            startIcon={<PersonRemoveOutlinedIcon />}
                            variant="outlined"
                            color="third"
                            sx={{ p: 2, mt: 3, width: {xs: "180px", md: "350px"}, fontSize: {xs: '11px', md: '14px'}}}
                            onClick={user.isAdmin ? () => navigate('/deletegm'): () => navigate('/')}
                        >
                            Retirer un GM dans le sytème
                        </Button>
                        <span style={ {width: '100%' }} />
                        <Button
                            startIcon={<EditOutlinedIcon />}
                            variant="outlined"
                            color="third"
                            sx={{ p: 2, mt: 3, width: {xs: "180px", md: "350px"}, fontSize: {xs: '11px', md: '14px'}}}
                        >
                           Modifier un GM dans le système
                        </Button>
                        <Button
                            startIcon={<AccessTimeOutlinedIcon />}
                            variant="outlined"
                            color="third"
                            sx={{ p: 2, mt: 3, mb: 3, width: {xs: "180px", md: "350px"}, fontSize: {xs: '11px', md: '14px'}}}
                        >
                            Consulter les heures
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
    }

};

export default Gm;