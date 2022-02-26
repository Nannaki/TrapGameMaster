import React, {useState} from 'react';
import { Toolbar, AppBar, Typography, Box, Button, IconButton, Menu, Container, Avatar, Tooltip, MenuItem } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu'

const pages = ['Page1', 'Page2', 'Page3'];
const settings = ['Profil', 'Account', 'Dashboard', 'Logout'];

const ResponsiveAppBar = () => {
    const [anchorNav, setAnchorNav] = useState(null);
    const [anchorUser, setAnchorUser] = useState(null);


    const handleOpenNavMenu = (e) => {
        setAnchorNav(e.currentTarget);
    };

    const handleOpenUserMenu = (e) => {
        setAnchorUser(e.currentTarget)
    };

    const handleCloseNavMenu = () => {
        setAnchorNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorUser(null);
    };

    return (
        <AppBar position="static" color='primary'>
            <Container maxWidth="x1">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                        >
                        TrapGameMaster
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size='Large'
                            aria-label='account of current user'
                            aria-controls='menu-appbar'
                            aria-haspopup='true'
                            onClick={handleOpenNavMenu}
                            color='inherit'
                            >
                            <MenuIcon />
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
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                            >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography textAlign='center'>{page}</Typography>
                                </MenuItem>
                                ))}
                        </Menu>
                    </Box>
                    <Typography
                        variant='h6'
                        noWrap
                        component='div'
                        sx={{ flexGrow: 1, display: { xs:'flex', md: 'none'} }}
                        >
                        TrapGameMaster
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                            key={page}
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title='Open settings'>
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt='test' src='#' />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id='menu-appbar'
                            anchorEl={anchorUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorUser)}
                            onClose={handleCloseUserMenu}
                            >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Typography textAlign='center'>{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default ResponsiveAppBar;

