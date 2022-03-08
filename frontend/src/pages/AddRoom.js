import Header from '../components/Header';
import {Box, Button, Card, Checkbox, FormControlLabel, TextField, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import BackspaceOutlinedIcon from "@mui/icons-material/BackspaceOutlined";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import Loading from "../components/Loading";
import {addRoom, reset} from "../features/rooms/roomsSlice";

// TODO Changer les icons

const AddRoom = () => {

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        isActive: false
    });

    const { name, description, isActive } = formData;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, isSuccess, isError, message } = useSelector((state) => state.rooms)
    const { user } = useSelector((state) => state.auth)

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
    };

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
            navigate('/rooms')
            toast.success('La nouvelle salle a bien été enregistrée');
        }

        dispatch(reset());

    }, [isError, isSuccess, message, navigate, dispatch])

    const onSubmit = (e) => {

        e.preventDefault();

        const roomData = {
            name,
            description,
            isActive
        }

            dispatch(addRoom(roomData));
        }

    if(isLoading) {
        return <Loading />
    }

    return (
        <>
            <Header />
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
                        <HowToRegOutlinedIcon sx={{ fontSize: {xs: "18px", md: "30px"} }}/> Enregistrer une nouvelle <br/> salle
                    </Typography>
                    <TextField id='name'
                               required
                               label='Nom'
                               variant='outlined'
                               sx={{ m: 1, width: '50%'}}
                               fullWidth
                               onChange={onChange}
                               value={name}
                               name='name'
                    />
                    <TextField id='description'
                               label='Description'
                               variant='outlined'
                               sx={{ m: 1, width: '50%'}}
                               fullWidth
                               multiline
                               onChange={onChange}
                               value={description}
                               name='description'
                    />
                    <span style={ {width: '100%' }} />
                    <FormControlLabel control={
                        <Checkbox
                            onChange={onCheck}
                            id='isActive'
                            value={isActive}
                            name='isActive'
                            checked={isActive}
                        />
                    }
                          label='Active' />
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

export default AddRoom;