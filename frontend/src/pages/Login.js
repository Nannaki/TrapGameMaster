import React, {useEffect, useState} from 'react';
import {Box, Button, Paper, TextField, Typography} from "@mui/material";
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import { login, reset } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import Loading from "../components/Loading";

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password:'',
    });

    const { email, password } = formData;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth);

    useEffect(() => {
        if(isError) {
            toast.error(message)
        }

        if(isSuccess || user) {
            if(user.isAdmin === true) {
                navigate('/dashboardadmin')
            }
            else {
                navigate('/dashboardgm' +user._id)
            }

        }

        dispatch(reset())

    }, [user, isError, isSuccess, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const userData = {
            email,
            password,
        }

        dispatch(login(userData))

    }

    if(isLoading) {
        return <Loading />
    }

    return (
    <>
        <Typography
            variant='h6'
            noWrap
            component='div'
            sx={{mt: 3, color: 'white', textAlign: 'center', fontSize: {xs: 'medium', md: 'xx-large'}}}
        >
            TrapGameMaster
        </Typography>
            <Box
                component='form'
                sx={{ mt: 4, ml: 2, mr: 2, display: "flex", justifyContent:'center', alignItems: 'center', flexWrap: 'nowrap', textAlign: 'center' }}
                noValidate
                onSubmit={onSubmit}
            >
                <Paper elevation={5} sx={{ p:2 }}>
                    <Typography variant='h4' component='div' align='center' sx={{fontSize: {xs: '28px', md: '38px'}}}><VpnKeyOutlinedIcon sx={{ fontSize: {xs: '25px', md: '30px'}}}/> Se connecter</Typography>
                        <TextField id='email'
                                   required
                                   label='Email'
                                   variant='outlined'
                                   sx={{ mt: 4, width: '80%'}}
                                   type='email'
                                   onChange={onChange}
                                   value={email}
                                   name='email'
                        />
                        <TextField id='password'
                                   required
                                   label='Password'
                                   variant='outlined'
                                   sx={{ mt: 4, width: '80%'}}
                                   type='password'
                                   onChange={onChange}
                                   value={password}
                                   name='password'
                        />
                        <span style={ {width: '100%' }} />
                        <Button variant='contained'
                                color='primary'
                                sx={{ m: 3 }}
                                endIcon={<ExitToAppOutlinedIcon />}
                                type='submit'
                        >
                            Go
                        </Button>
                </Paper>
        </Box>
    </>
    );
};

export default Login;