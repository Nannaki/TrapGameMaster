import Header from "../components/Header";
import {Box, Card, FormControl, InputLabel, Select, Typography, MenuItem, FormHelperText, Button} from "@mui/material";
import ScheduleDays from "../components/SheduleDays"
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {getActualsMonths, getAllDaysInMonth, registerUserAvailblity, reset} from "../features/schedule/scheduleSlice";
import {getUserById} from "../features/auth/authSlice";
import Loading from "../components/Loading";
import {toast} from "react-toastify";
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import BackspaceOutlinedIcon from "@mui/icons-material/BackspaceOutlined";

const AvailablityGm = () => {

    let today = new Date();
    const [formData, setFormData] = useState( {
        month: today.getMonth(),
        year: today.getFullYear(),
    });
    const [hidden, setHidden] = useState(true);
    const [allDay, setAllDay] = useState(false);
    const {month, year} = formData;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { months, days, isLoading, isSuccess, isError, message } = useSelector((state) => state.schedule);
    const {userInfo} = useSelector((state) => state.auth);
    const finalDays = [];
    const dayAvailable = [];
    const id = JSON.parse(localStorage.getItem("user"));


    useEffect(() => {

        dispatch(getActualsMonths())
        dispatch(getUserById(id._id))

    }, [dispatch, id._id])


    useEffect(() => {
        if(isSuccess) {
            dispatch(reset())
            navigate('/dashboardGM:id')
            toast.success('Vos disponibilités ont bien été enregistrées')
        }

        if(isError) {
            toast.error(message)
            dispatch(reset())
            dispatch(getActualsMonths())
            dispatch(getUserById(id._id))
            setHidden(true)
        }
    }, [isSuccess, isError, dispatch, message, navigate, id._id])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    };

    const onSubmit = (e) => {
        e.preventDefault()
        const dateData = {
            month,
            year,
        }

        dispatch(getAllDaysInMonth(dateData))
        setHidden(false)
    }

    const handleAvailablityForm = (e) => {
        e.preventDefault()

        for (let i = 0; i < e.target.length; i++) {
            dayAvailable.push({
                date: e.target[i].name.split(" ").slice(0, -1).join(" ").toString(),
                avail: e.target[i].value,
                shift: e.target[i].name.split(" ").splice(-1).toString()
            });
        }

        const availblity = {
            name: userInfo.name+month.toString()+year.toString(),
            choosedMonth: month.toString(),
            chooseYear: year.toString(),
            availblity: dayAvailable
        }

        dispatch(registerUserAvailblity(availblity));
    }

    if(days) {
        days.forEach((item, index) => {
            finalDays.push(<ScheduleDays
                    key={index}
                    date = {item}
                    allDay = {allDay}
                />
            )
        })
    }

    if(isLoading) {
        return <Loading />
    }

    return (
        <>
            <Header />
            <Box
                sx={{ mt: 12, display: "flex", justifyContent:'center', flexWrap: 'wrap', textAlign: 'center' }}
            >
                <Card
                    component="form"
                    elevation={8}
                    square
                    onSubmit={(e)=>onSubmit(e)}
                    sx={{ width: {xs: "310px", md: "500px"}, display: "flex", flexWrap: "wrap", justifyContent:'center', alignItems: 'center' }}
                >
                    <Typography
                        variant='h6'
                        noWrap
                        component='div'
                        sx={{mt: 3, mb:3, color: 'white', textAlign: 'center', fontSize: {xs: '18px', md: 'x-large'}}}
                    >
                        <EventAvailableIcon sx={{ fontSize: {xs: "18px", md: "30px"} }}/> Envoyer mes disponibilités
                    </Typography>
                    <span style={{width: "100%"}} />
                    <FormControl
                        sx={{ width: {xs: "120px", md: "220px"}, display: "flex", flexWrap: "wrap", justifyContent:'center' }}
                    >
                        <InputLabel
                            id="month"
                            sx={{fontSize: {xs: '14px', md: '16px'}}}
                        >
                            Mois
                        </InputLabel>
                        <Select
                            labelId="month"
                            name="month"
                            id="monthSelect"
                            value={month}
                            label="Mois"
                            onChange={onChange}
                            sx={{fontSize: {xs: '14px', md: '16px'}}}
                        >
                            {months.map((month) => (
                                <MenuItem
                                    key={month.month}
                                    value={month.monthNumeric}
                                    sx={{fontSize: {xs: '14px', md: '16px'}}}
                                >
                                    {month.month}
                                </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText
                            sx={{mb:2, fontSize: {sx: "12px", md: "14px"}}}
                        >
                            Choisissez le mois
                        </FormHelperText>
                    </FormControl>
                    <span style={{width: "100%"}} />
                    <FormControl
                        sx={{ width: {xs: "120px", md: "220px"}, display: "flex", flexWrap: "wrap", justifyContent:'center' }}
                    >
                        <InputLabel
                            id="year"
                            sx={{fontSize: {xs: '14px', md: '16px'}}}
                        >
                            Année
                        </InputLabel>
                        <Select
                            labelId="year"
                            id="yearSelect"
                            name="year"
                            value={year}
                            label="Année"
                            onChange={onChange}
                        >
                            <MenuItem value={year}>{year}</MenuItem>
                            <MenuItem value={year+1}>{year+1}</MenuItem>
                        </Select>
                        <FormHelperText
                            sx={{mb:2, fontSize: {sx: "12px", md: "14px"}}}
                        >
                            Choisissez l'année
                        </FormHelperText>
                    </FormControl>
                    <span style={{width: "100%"}} />
                    <Button variant='contained'
                            color='secondary'
                            sx={{ my: 3, mr: 1 }}
                            startIcon={<BackspaceOutlinedIcon />}
                            onClick={() => navigate('/dashboardGM:id')}
                    >
                        Retour
                    </Button>
                    <Button
                        variant='contained'
                        color='success'
                        sx={{ my: 3, ml:1 }}
                        type="submit"
                        endIcon={<ExitToAppOutlinedIcon />}
                    >
                        Planning
                    </Button>
                </Card>
                <span style={{width: "100%"}} />

                {hidden ? <Box /> :
                <Box
                    sx={{mb: 2, width: {xs: "80%", md: "60%"}, mt: 4, display: "flex", justifyContent:'center', flexWrap: 'wrap', textAlign: 'center' }}
                    component="form"
                    onSubmit={handleAvailablityForm}
                >
                    {finalDays.map((day) => (
                            <Card
                                sx={{ width: "200px", display: "flex", flexWrap: "wrap", justifyContent:'center', alignItems: 'center', m:2 }}
                                key={day.key}
                                elevation={8}
                            >
                                {day}
                                <FormHelperText
                                    sx={{mb: 2}}
                                >
                                    9h-14h | 14h-19h |19h-00h
                                </FormHelperText>
                            </Card>
                    ))}
                    <span style={{width: "100%"}} />
                    <Button variant='contained'
                            color='secondary'
                            sx={{ m: 1 }}
                            startIcon={<BackspaceOutlinedIcon />}
                            onClick={() => navigate('/dashboardGM:id')}
                    >
                        Retour
                    </Button>
                    <Button
                        variant='contained'
                        color='success'
                        sx={{ m: 1 }}
                        type="submit"
                        endIcon={<ExitToAppOutlinedIcon />}
                    >
                        Envoyer mes dispos
                    </Button>
                </Box> }
            </Box>
        </>
    );
};

export default AvailablityGm;