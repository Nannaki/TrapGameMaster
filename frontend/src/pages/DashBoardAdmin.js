import React, {useEffect} from 'react';
import {Box} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import Header from "../components/Header";
import Loading from "../components/Loading";
import Footer from "../components/Footer";

const DashBoardAdmin = () => {
    const navigate = useNavigate();
    const {user, isLoading } = useSelector((state) => state.auth);


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
            </Box>
            <Footer/>
        </>
    );
};

export default DashBoardAdmin;