import {AppBar, Container, Toolbar, Typography, Box, IconButton, Menu, MenuItem, Button} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import { useNavigate} from "react-router-dom";
import {logout, reset} from "../features/auth/authSlice";


const Header = () => {
    const [anchorNav, setAnchorNav] = useState(null);
    const {user} = useSelector((state) => state.auth);
    const optionsAdmin = ['Planning', 'Salles', 'GM']
    const optionsGm = ['Disponibilités', 'Planning', 'Profil', 'Salles']
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleOpenBurgerMenu = (e) => {
        setAnchorNav(e.currentTarget);
    };

    const handleCloseBurgerMenu = () => {
        setAnchorNav(null);
    };

    const handleNavigate = (e) => {
        if(e.target.value === 'GM') {
            navigate('/gm')
        }

        if(e.target.value === 'Salles') {
            navigate('/rooms')
        }
    }

    const onLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate('/');
    }

    if (user) {
        return (
            <AppBar elevation={12} position="fixed" enableColorOnDark sx={{ backgroundColor: "#358135" }}>
                <Container maxWidth='xl'>
                    <Toolbar disableGutters>
                        <Typography
                            variant='h6'
                            noWrap
                            component='div'
                            sx={{mr: 2, ml: 5, display: {xs: 'none', md: 'flex'}, cursor: "pointer"}}
                            onClick={user.isAdmin ? () => navigate('/dashboardadmin'): () => navigate('/dashboardGM')}
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
                            sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}
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
                            variant='contained'
                            color='error'
                            sx={{ m: 3 }}
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