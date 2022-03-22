import React, {useEffect} from 'react';
import Header from "../components/Header";
import {Box} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import Scheduler from "../components/Scheduler";
import {getUsersAvailblity} from "../features/schedule/scheduleSlice";
import SchedulerTest from "../components/SchedulerTest";



const EditSchedule = () => {

    const dispatch = useDispatch();
    const {days, usersAvailblity} = useSelector((state) => state.schedule);
    const {users} = useSelector((state) => state.auth)

    useEffect(() => {
        dispatch(getUsersAvailblity({month: 2, year: 2022}))

    },[dispatch])


    return (
        <>
            <Header />
            <Box
                sx={{m: "0 auto", mt: 12, width: "90%"}}
                >
                <h1>EDIT PLAN</h1>
                <SchedulerTest/>
            </Box>
        </>
    );
};

export default EditSchedule;