//Imports
import {AppBar, Container, Toolbar, Typography, Box, IconButton, Menu, MenuItem, Button} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import { useNavigate} from "react-router-dom";
import {logout, reset} from "../features/auth/authSlice";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

//Instanciation du composent
const Header = () => {

    //Déclaration de constantes et states
    const [anchorNav, setAnchorNav] = useState(null);
    const {user} = useSelector((state) => state.auth);
    const optionsAdmin = ['Planning', 'Salles', 'GM']
    const optionsGm = ['Disponibilités', 'Plans', 'Profil', 'Salles']
    const navigate = useNavigate();
    const dispatch = useDispatch();

    //Gestion du burger menu
    const handleOpenBurgerMenu = (e) => {setAnchorNav(e.currentTarget)};
    const handleCloseBurgerMenu = () => {setAnchorNav(null)};

    //Gestion de clique de navigation
    const handleNavigate = (e) => {
        if(e.target.value === 'GM') {
            navigate('/gm')
        }

        if(e.target.value === 'Salles') {
            navigate('/rooms')
        }

        if(e.target.value === 'Salles' && !user.isAdmin) {
            navigate('/showrooms')
        }

        if(e.target.value === 'Disponibilités') {

            navigate('/dispogm' +user.name)
        }
        if(e.target.value === 'Planning' && user.isAdmin) {
            navigate('/editschedule')
        }
        if(e.target.value === 'Plans') {
            navigate('/schedulegm')
        }
    }

    //Gestion de la déconection de l'utilisateur
    const onLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate('/');
    }

    //JSX
    if (user) {
        return (
            <AppBar elevation={12} position="fixed" enableColorOnDark sx={{ backgroundColor: "#358135" }}>
                <Container maxWidth='xl'>
                    <Toolbar>
                        <Typography
                            variant='h6'

                            component='div'
                            sx={{mr: 2, ml: 5, display: {xs: 'none', md: 'flex'}, cursor: "pointer"}}
                            onClick={() => navigate('/')}
                        >
                            TrapGameMaster
                        </Typography>
                        <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                            <IconButton
                                size='Large'
                                aria-label='account of current user'
                                aria-controls='menu-appbar'
                                aria-haspopup='true'
                                color='inherit'
                                onClick={handleOpenBurgerMenu}
                            >
                                <MenuIcon/>
                            </IconButton>
                            <Menu
                                id='menu-appbar'
                                anchorEl={anchorNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left'
                                }}
                                open={Boolean(anchorNav)}
                                onClose={handleCloseBurgerMenu}
                                sx={{
                                    display: {xs: 'block', md: 'none'},
                                    position: {top:0, left:0},
                                }}
                                elevation={10}
                            >
                                {user.isAdmin ? optionsAdmin.map((option) => (
                                    <MenuItem key={option} onClick={handleCloseBurgerMenu}>
                                        <Button
                                            key={option}
                                            value={option}
                                            onClick={handleNavigate}
                                            sx={{color: 'white', display: 'block', fontSize: 12, textAlign: 'left', letterSpacing: 0.5}}
                                            size="small"
                                            variant="outlined"

                                        >
                                            {option}
                                        </Button>
                                    </MenuItem>
                                )) : optionsGm.map((option) => (
                                    <MenuItem key={option} onClick={handleCloseBurgerMenu}>
                                        <Button
                                            variant="outlined"
                                            key={option}
                                            value={option}
                                            onClick={handleNavigate}
                                            sx={{color: 'white', display: 'block', fontSize: 12}}
                                            size="small"

                                        >
                                            {option}
                                        </Button>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        <Typography
                            variant='h6'
                            noWrap
                            component='div'
                            sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}, cursor: "pointer", fontSize: "16px"}}
                            onClick={user.isAdmin ? () => navigate('/'): () => navigate('/dashboardGm'+user._id)}

                        >
                            TrapGameMaster
                        </Typography>
                        <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}, justifyContent: 'left', ml:3}}>
                            {user.isAdmin ? optionsAdmin.map((option) => (
                                <Button
                                    key={option}
                                    onClick={handleNavigate}
                                    value={option}
                                    sx={{ color: '#fffefe', display: 'block', textAlign: 'left', ml:3, mr:3}}
                                    variant="text"
                                    color="lightHover"
                                    size="medium"
                                >
                                    {option}
                                </Button>
                            )) : optionsGm.map((option) => (
                                <Button
                                    key={option}
                                    onClick={handleNavigate}
                                    value={option}
                                    sx={{ color: '#fffefe', display: 'block', textAlign: 'left', ml: 3, mr:3}}
                                    variant="text"
                                    color="lightHover"
                                    size="medium"
                                >
                                    {option}
                                </Button>
                            ))}
                        </Box>
                        <Button
                            variant='outlined'
                            color='lightHover'
                            sx={{ ml:1, fontSize: {xs: "12px", md:"14px"}}}
                            startIcon={<LogoutOutlinedIcon />}
                            onClick={onLogout}
                        >
                            Logout
                        </Button>
                    </Toolbar>
                </Container>
            </AppBar>
        );
    } else {
        return null;
    }
}

export default Header;