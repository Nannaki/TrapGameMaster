import Header from "../components/Header";
import {Box, Button, Typography} from "@mui/material";
import SchedulerAdmin from "../components/SchedulerAdmin";
import HistoryToggleOffOutlinedIcon from '@mui/icons-material/HistoryToggleOffOutlined';
import React from "react";
import BackspaceOutlinedIcon from "@mui/icons-material/BackspaceOutlined";
import {useNavigate} from "react-router-dom";


const EditSchedule = () => {

    const navigate = useNavigate();

    return (
        <>
            <Header />
            <Box>
                <Typography
                    variant='h1'
                    noWrap
                    component='div'
                    sx={{mt: 13, mb:3, color: 'white', textAlign: 'center', width: "100%", fontSize: {xs: "25px", md: "30px"}}}
                >
                    <HistoryToggleOffOutlinedIcon sx={{ fontSize: {xs: "25px", md: "x-large"}, mr: 1}}/>
                    Planning
                </Typography>
                <SchedulerAdmin/>
            </Box>
            <Box
                sx={{display: "flex", justifyContent: "center", alignItems: "center"}}
            >
                <Button
                    variant='contained'
                    color='secondary'
                    sx={{ my: 3 }}
                    startIcon={<BackspaceOutlinedIcon />}
                    onClick={() => navigate('/')}
                >
                    Retour
                </Button>
            </Box>
        </>
    );
};

export default EditSchedule;