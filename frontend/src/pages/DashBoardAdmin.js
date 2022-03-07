import React, {useEffect} from 'react';
import {Box, Button} from "@mui/material";
import { logout, reset } from "../features/auth/authSlice";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Header from "../components/Header";
import Loading from "../components/Loading";

//TODO dans le menu planning, ajouter la possibilité d'enlever ou mettre une salle dans le planning

const DashBoardAdmin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user, isLoading } = useSelector((state) => state.auth);

    const onLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate('/');
    }

    useEffect(() => {
        if(!user) {
            navigate('/');
        }

    }, [user, navigate])

    if(isLoading) {
        return <Loading />
    }

    return (
        <>
            <Header/>
            <Box
                sx={{ mt: 12, display: "flex", justifyContent: "center", flexWrap: 'wrap', textAlign: 'center' }}
            >
                <h1>Bonjour {user ? user.name : null}</h1>
                <Button variant='contained'
                        color='error'
                        sx={{ m: 3 }}
                        onClick={onLogout}
                >
                    Logout
                </Button>
            </Box>

        </>
    );
};

export default DashBoardAdmin;