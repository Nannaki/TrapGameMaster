import React from 'react';
import Header from "./Header";
import {Box, Typography} from "@mui/material";
import HistoryToggleOffOutlinedIcon from "@mui/icons-material/HistoryToggleOffOutlined";
import {SchedulerGm} from "./SchedulerGm";

const ShowScheduleGm = () => {
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
            </>
        </div>
    );
};

export default ShowScheduleGm;