import React, {useEffect} from 'react';
import {logout, reset} from "../features/auth/authSlice";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {Button} from "@mui/material";
import {toast} from "react-toastify";
import Header from "../components/Header";



const DashBoardGM = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.auth);

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

    return (
        <div>
            <Header/>
            <h1>Bonjour {user ? user.name : null}</h1>
            <Button variant='contained'
                    color='error'
                    sx={{ m: 30 }}
                    onClick={onLogout}
            >
                Logout
            </Button>
        </div>
    );
};

export default DashBoardGM;