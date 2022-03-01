import React, {useEffect, useState} from 'react';
import {Box, Button, CircularProgress, Paper, TextField, Typography} from "@mui/material";
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import { login, reset } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";

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
                navigate('/dashboardgm')
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
        return <CircularProgress/>
    }

    return (
        <>
            <Paper elevation={4} sx={{ mt: 4, ml: 2, mr: 2}}>
                <Typography variant='h4' component='div' align='center'><VpnKeyOutlinedIcon sx={{ fontSize: '28px', marginTop: '5%'}}/> Login</Typography>
                <Box
                    component='form'
                    sx={{ m: 2 ,display: "flex", justifyContent:'center', flexWrap: 'wrap' }}
                    noValidate
                    onSubmit={onSubmit}
                >
                    <TextField id='email'
                               required
                               label='Email'
                               variant='outlined'
                               sx={{ m: 1, width: '50%'}}
                               fullWidth
                               type='email'
                               onChange={onChange}
                               value={email}
                               name='email'
                    />
                    <TextField id='password'
                               required
                               label='Password'
                               variant='outlined'
                               sx={{ m: 1, width: '50%'}}
                               fullWidth
                               type='password'
                               onChange={onChange}
                               value={password}
                               name='password'
                    />
                    <span style={ {width: '100%' }} />
                    <Button variant='contained'
                            color='success'
                            sx={{ m: 3 }}
                            endIcon={<ExitToAppOutlinedIcon />}
                            type='submit'
                    >
                        Submit
                    </Button>
                </Box>
            </Paper>
        </>
    );
};

export default Login;