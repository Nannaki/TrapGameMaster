import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import Header from "../components/Header";
import {Typography, Box, Button, Card, CardContent} from "@mui/material";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import BackspaceOutlinedIcon from "@mui/icons-material/BackspaceOutlined";
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';

const Rooms = () => {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

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
                            startIcon={<DateRangeOutlinedIcon />}
                            variant="outlined"
                            color="third"
                            sx={{ p: 2, mt: 3, width: {xs: "180px", md: "350px"}, fontSize: {xs: '11px', md: '14px'}}}
                        >
                            Ajouter / Retirer du planning
                        </Button>
                        <span style={ {width: '100%' }} />
                        <Button
                            startIcon={<AdminPanelSettingsOutlinedIcon />}
                            variant="outlined"
                            color="third"
                            sx={{ p: 2, mt: 3, mb: 3, width: {xs: "180px", md: "350px"}, fontSize: {xs: '11px', md: '14px'}}}
                        >
                            Ajouter / Retirer du système
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