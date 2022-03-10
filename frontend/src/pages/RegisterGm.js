import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from "react-redux";
import {toast} from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    Card,
    TextField,
    Typography,
    FormControl,
    FormLabel, FormGroup, FormHelperText
} from "@mui/material";
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import BackspaceOutlinedIcon from '@mui/icons-material/BackspaceOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import { register, reset } from "../features/auth/authSlice";
import Header from "../components/Header";
import Loading from "../components/Loading";
import {getRooms} from "../features/rooms/roomsSlice";


const RegisterGm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password:'',
        password2: '',
        isAdmin: false,
        rooms: [],
    });

    const { name, email, password, password2, isAdmin } = formData;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth);
    const {rooms} = useSelector((state) => state.rooms)

    //TODO Push les valeur des checkBox dans le tableau (actuellemnt push mais se multiplie)

    useEffect(() => {
        dispatch(getRooms())
    }, [dispatch])

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

    const onCheckRoom = (e) => {
        setFormData( (prevState)  => ({
            ...prevState,
            [formData.rooms]: formData.rooms.push(e.target.value)
        }))
        console.log(formData.rooms)
    }



    useEffect(() => {
        if(!user) {
            navigate('/')
        }
    }, [user, navigate])

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
        return <Loading />
    }

    return (
        <>
            <Header/>
                <Box
                    sx={{ mt: 12, display: "flex", justifyContent:'center', alignItems: 'center', flexWrap: 'wrap', textAlign: 'center' }}
                    onSubmit={onSubmit}
                     >
                    <Card
                        component={"form"}
                        elevation={8}
                        square
                        sx={{ width: {xs: "280px", md: "600px"}, display: "flex", flexWrap: "wrap", justifyContent:'center', alignItems: 'center' }}
                    >
                        <Typography
                            variant='h6'
                            noWrap
                            component='div'
                            sx={{mt: 3, mb:3, color: 'white', textAlign: 'center', fontSize: {xs: '18px', md: 'xx-large'}}}
                        >
                            <HowToRegOutlinedIcon sx={{ fontSize: {xs: "18px", md: "30px"} }}/> Enregistrer un nouveau <br/> GameMaster
                        </Typography>
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
                        <FormControl color="secondary" sx={{width: "50%", mt: 2, borderBottom: '1px solid #f1f1f1', borderTop: '1px solid #f1f1f1'}}>
                            <FormLabel component="legend">Salles masterisées</FormLabel>
                            <FormGroup>
                                { rooms.map((room) => (
                                    <FormControlLabel
                                        key={room._id}
                                        control={
                                            <Checkbox
                                                color="secondary"
                                                onChange={onCheckRoom}
                                                value={room._id}
                                                name={room._id}
                                            />
                                        }
                                        label={room.name} />
                                    ))}
                            </FormGroup>
                            <FormHelperText>Ne pas cocher si le gm n'a pas encore de salle</FormHelperText>
                        </FormControl>
                        <span style={ {width: '100%' }} />
                        <FormControl color="secondary" sx={{mt: 1, borderBottom: '1px solid #f1f1f1', width: "50%"}}>
                            <FormLabel component="legend">Rôle de l'utilisateur</FormLabel>
                            <FormGroup>
                                <FormControlLabel control={
                                    <Checkbox
                                        color="secondary"
                                        onChange={onCheck}
                                        value={isAdmin}
                                        name="isAdmin"
                                        checked={isAdmin}
                                    />
                                }
                                label='Admin'/>
                            </FormGroup>
                            <FormHelperText>Cocher si l'utilisateur est administrateur</FormHelperText>
                        </FormControl>
                        <span style={ {width: '100%' }} />
                        <Button variant='contained'
                                color='success'
                                sx={{ m: 3 }}
                                endIcon={<ExitToAppOutlinedIcon />}
                                type='submit'
                        >
                            Enregistrer
                        </Button>
                        <Button variant='contained'
                                color='secondary'
                                sx={{ m: 3 }}
                                endIcon={<BackspaceOutlinedIcon />}
                                onClick={() => navigate('/gm')}
                        >
                            Retour
                        </Button>
                    </Card>
                </Box>
        </>
    );
};

export default RegisterGm;