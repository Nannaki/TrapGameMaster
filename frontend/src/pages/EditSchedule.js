import Header from "../components/Header";
import {Box, Typography} from "@mui/material";
import SchedulerAdmin from "../components/SchedulerAdmin";
import HistoryToggleOffOutlinedIcon from '@mui/icons-material/HistoryToggleOffOutlined';
import React from "react";


const EditSchedule = () => {

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
        </>
    );
};

export default EditSchedule;