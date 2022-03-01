import React, {useEffect} from 'react';
import {Button} from "@mui/material";
import { logout, reset } from "../features/auth/authSlice";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";


const DashBoardAdmin = () => {
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
        else {
            toast.success('Bienvenue '+ user.name);
        }
    }, [user, navigate])

    return (
        <div>
            <h1>Dashboard Admin</h1>
            <Button variant='contained'
                    color='error'
                    sx={{ m: 3 }}
                    onClick={onLogout}
            >
                Logout
            </Button>
        </div>
    );
};

export default DashBoardAdmin;