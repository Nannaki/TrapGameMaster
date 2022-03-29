import React from 'react';
import Header from "./Header";
import {Box, Button, Typography} from "@mui/material";
import HistoryToggleOffOutlinedIcon from "@mui/icons-material/HistoryToggleOffOutlined";
import {SchedulerGm} from "./SchedulerGm";
import BackspaceOutlinedIcon from "@mui/icons-material/BackspaceOutlined";
import {useNavigate} from "react-router-dom";

const ShowScheduleGm = () => {

    const navigate = useNavigate()

    return (
        <div>
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
                        Plans
                    </Typography>
                    <SchedulerGm />
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
        </div>
    );
};

export default ShowScheduleGm;