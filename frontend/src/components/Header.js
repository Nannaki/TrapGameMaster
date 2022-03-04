import {AppBar, Container, Toolbar, Typography, Box, IconButton, Menu, MenuItem, Button} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React, {useState} from "react";
import {useSelector} from "react-redux";
import { useNavigate} from "react-router-dom";


const Header = () => {
    const [anchorNav, setAnchorNav] = useState(null);
    const {user} = useSelector((state) => state.auth);
    const optionsAdmin = ['Planning', 'Salles', 'GM']
    const optionsGm = ['Disponibilités', 'Planning', 'Profil']
    const navigate = useNavigate();

    const handleOpenBurgerMenu = (e) => {
        setAnchorNav(e.currentTarget);
    };

    const handleCloseBurgerMenu = () => {
        setAnchorNav(null);
    };

    const handleNavigate = (e) => {
        if(e.target.value === 'GM') {
            navigate('/registergm')
        }
    }

    if (user) {
        return (
            <AppBar position="static" color='primary'>
                <Container maxWidth='x1'>
                    <Toolbar disableGutters>
                        <Typography
                            variant='h6'
                            noWrap
                            component='div'
                            sx={{mr: 2, ml: 5, display: {xs: 'none', md: 'flex'}}}
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
                                    position: {top:0, left:0}
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
                                    sx={{my: 2, color: '#fffefe', display: 'block', textAlign: 'center', ml:3, mr:3}}
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                >
                                    {option}
                                </Button>
                            )) : optionsGm.map((option) => (
                                <Button
                                    key={option}
                                    onClick={handleNavigate}
                                    value={option}
                                    sx={{my: 2, color: '#fffefe', display: 'block', textAlign: 'left', ml: 3, mr:3}}
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                >
                                    {option}
                                </Button>
                            ))}
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        );
    } else {
        return null;
    }
}


export default Header;