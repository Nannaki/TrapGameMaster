import React, {useEffect, useState} from 'react';
import Header from "../components/Header";
import {Box, Grid, Paper} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {getAllDaysInMonth, getUsersAvailblity} from "../features/schedule/scheduleSlice";



const EditSchedule = () => {

    const dispatch = useDispatch();
    const {days, usersAvailblity} = useSelector((state) => state.schedule);


    useEffect(() => {
        dispatch(getAllDaysInMonth({month: 2, year: 2022}))
        dispatch(getUsersAvailblity({month: 2, year: 2022}))

    },[dispatch])

    return (
        <>
            <Header />
            <Box
                sx={{m: "0 auto", mt: 12, width: "80%"}}
                >
                <h1>EDIT PLAN</h1>
                <Paper>
                    <Grid container spacing={2} columns={16} sx={{overflow: "hidden"}} direction="column" justifyContent="center">
                        {days.map((day) => (
                            <>
                            <Grid item ml={2} xs={1} md={2} key={day} border="1px solid white">
                                <p>{day.split("mars 2022")}</p>
                            </Grid>
                            <Grid item ml={2} xs={1} md={2} key={day} border="1px solid white">
                                <p>coucou</p>
                            </Grid>
                            </>
                        ))}
                    </Grid>
                </Paper>

            </Box>
        </>
    );
};

export default EditSchedule;