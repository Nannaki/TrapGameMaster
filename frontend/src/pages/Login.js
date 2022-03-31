//Imports
import React, {useEffect, useState} from 'react';
import {Box, Button, Paper, TextField, Typography} from "@mui/material";
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import { login, reset } from "../features/auth/authSlice";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import Loading from "../components/Loading";

//Instanciation du composent
const Login = () => {

    //Déclaration des constantes et des states
    const [formData, setFormData] = useState({
        email: '',
        password:'',
    });
    const { email, password } = formData;
    const dispatch = useDispatch();
    const { user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth);

    //Affiche les erreurs
    //@Dépendance: Dispatch, isError, message
    useEffect(() => {
        if(isError) {
            toast.error(message)
        }

        dispatch(reset())

    }, [isError, message, dispatch])

    //Capture les changements dans les inputs de login
    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    };

    //Gestion de l'envoie du formulaire pour traitement en BDD
    const onSubmit = (e) => {
        e.preventDefault();

        const userData = {
            email,
            password,
        }
        dispatch(login(userData))
    }

    //Composent de chargement
    if(isLoading) {
        return <Loading />
    }

    //JSX
    return (
    <>
        <Typography
            variant='h6'
            noWrap
            component='div'
            sx={{mt: 12, color: 'white', textAlign: 'center', fontSize: {xs: 'x-large', md: 'xx-large'}}}
        >
            TrapGameMaster
        </Typography>
            <Box
                component='form'
                sx={{ mt: 4, ml: 2, mr: 2, display: "flex", justifyContent:'center', alignItems: 'center', flexWrap: 'nowrap', textAlign: 'center' }}
                noValidate
                onSubmit={onSubmit}
            >
                <Paper elevation={5} sx={{ p:2, width: {xs: "300px", md: "480px"} }}>
                    <Typography variant='h4' component='div' align='center' sx={{fontSize: {xs: 'large', md: 'x-large'}}}><VpnKeyOutlinedIcon sx={{ fontSize: {xs: 'medium', md: 'x-large'}}}/> Connectez-vous</Typography>
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
                                endIcon={<LoginOutlinedIcon/>}
                                type='submit'
                        >
                            Se connecter
                        </Button>
                </Paper>
        </Box>
    </>
    );
};

export default Login;