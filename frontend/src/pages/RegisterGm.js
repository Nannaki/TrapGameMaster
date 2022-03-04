import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from "react-redux";
import {toast} from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Box, Button, Checkbox, FormControlLabel, Paper, TextField, Typography } from "@mui/material";
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import BackspaceOutlinedIcon from '@mui/icons-material/BackspaceOutlined';
import CircularProgress from '@mui/material/CircularProgress';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import { register, reset } from "../features/auth/authSlice";
import Header from "../components/Header";


const RegisterGm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password:'',
        password2: '',
        isAdmin: false
    });

    const { name, email, password, password2, isAdmin } = formData;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth);


    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    };

    const onCheck = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.checked,
        }))
    }


    useEffect(() => {
        if(!user) {
            navigate('/')
        }
    }, [])

    useEffect(() => {
        if(isError) {
            toast.error(message)
        }

        if(isSuccess) {
            navigate('/dashboardadmin')
            toast.success('Le nouveau GameMaster a bien été enregistré');
        }

        dispatch(reset());

    }, [user, isError, isSuccess, message, navigate, dispatch])

    const onSubmit = (e) => {
        e.preventDefault();

        if(password !== password2) {
            toast.error('Les mots de passe ne correspondent pas')
        }else {
            const userData = {
                name,
                email,
                password,
                isAdmin
            }

            dispatch(register(userData));
        }
    }

    if(isLoading) {
        return <CircularProgress/>
    }

    return (
        <>
            <Header/>
            <Paper elevation={4} sx={{ mt: 4, ml: 2, mr: 2}}>
                <Typography variant='h4' component='div' align='center'><HowToRegOutlinedIcon sx={{ fontSize: '28px', marginTop: '5%'}}/> Register</Typography>
                <Box
                    component='form'
                    sx={{ m: 2 ,display: "flex", justifyContent:'center', flexWrap: 'wrap' }}
                    noValidate
                    onSubmit={onSubmit}
                     >
                    <TextField id='name'
                               required
                               label='Name'
                               variant='outlined'
                               sx={{ m: 1, width: '50%'}}
                               fullWidth
                               onChange={onChange}
                               value={name}
                               name='name'
                    />
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
                    <TextField id='password2'
                               required
                               label='Check password'
                               variant='outlined'
                               sx={{ m: 1, width: '50%'}}
                               fullWidth
                               type='password'
                               onChange={onChange}
                               value={password2}
                               name='password2'
                    />
                    <span style={ {width: '100%' }} />
                    <FormControlLabel control={
                        <Checkbox
                        onChange={onCheck}
                        id='isAdmin'
                        value={isAdmin}
                        name='isAdmin'
                        checked={isAdmin}
                        />
                    }
                    label='Admin'/>
                    <span style={ {width: '100%' }} />
                    <Button variant='contained'
                            color='success'
                            sx={{ m: 3 }}
                            endIcon={<ExitToAppOutlinedIcon />}
                            type='submit'
                    >
                        Submit
                    </Button>
                    <Button variant='contained'
                            color='secondary'
                            sx={{ m: 3 }}
                            endIcon={<BackspaceOutlinedIcon />}
                            onClick={() => navigate('/dashboardadmin')}
                    >
                        Retour
                    </Button>

                </Box>
            </Paper>
        </>
    );
};

export default RegisterGm;