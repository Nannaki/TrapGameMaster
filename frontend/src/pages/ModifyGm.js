//Imports
import {Box, Typography, Paper, Card, ListItem, IconButton, List, Button, Dialog, DialogTitle, DialogContent, TextField} from "@mui/material";
import Header from "../components/Header";
import React, {useEffect, useState} from "react";
import AutoFixHighOutlinedIcon from '@mui/icons-material/AutoFixHighOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import {useDispatch, useSelector} from "react-redux";
import BackspaceOutlinedIcon from "@mui/icons-material/BackspaceOutlined";
import {useNavigate} from "react-router-dom";
import {getUserById, getUsers, updateUser} from "../features/auth/authSlice";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import {toast} from "react-toastify";
import Footer from "../components/Footer";

//Instanciation du composant
const ModifyGm = () => {

    //Déclaration des constantes et des states
    const [formData, setFormData] = useState({
        name: '',
        email: '',
    });
    const {name, email} = formData
    const [open, setOpen] = useState(false)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {users, userInfo, message, isSuccess, isError} = useSelector((state) => state.auth)

    //Gestion des clique sur la modal
    const handleOpenModal = () => {setOpen(true)}
    const handleCloseModal = () => {setOpen(false)}

    //Charge les utilisateurs depuis la BDD dans redux
    //@Dépendance: Dispatch
    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch])

    //Capture les changements dans les inputs pour la modification
    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    //JSX
    return (
        <>
            <Header />
            <Box sx={{ mt: 12, display: "flex", justifyContent:'center', alignItems: 'center', flexWrap: 'wrap', textAlign: 'center' }}
            >
                <Typography
                    variant='h6'
                    noWrap
                    component='div'
                    sx={{mt: 2, mb:3, color: 'white', textAlign: 'center', fontSize: {xs: '22px', md: 'xx-large'}, width: "100%"}}
                >
                    <EditOutlinedIcon sx={{ fontSize: {xs: "20px", md: "x-large"}}}/> Modifier les données d'un GameMaster
                </Typography>
                <Paper elevation={6} sx={{ width: {xs: "225px", md: "300px"} }}>
                    <List>
                        {users.map((user) => (
                            <Card
                                key={user._id}
                                sx={{ maxWidth: 345, m:4, border: "1px solid #f2f2f2"}}
                                elevation={18}
                            >
                                <ListItem
                                    sx={{ my: 2, fontSize: {xs: "18px", md: "21px"}, display: "flex", justifyContent: "center"}}
                                    variant="outlined"
                                    secondaryAction={
                                    <IconButton
                                        onClick={() => dispatch(getUserById(user._id)) && handleOpenModal()}
                                        variant="outlined"
                                        color="secondary"
                                        edge="end"
                                    >
                                        <AutoFixHighOutlinedIcon />
                                    </IconButton>
                                    }
                                >
                                    {user.name}
                                </ListItem>

                            </Card>
                        ))}
                    </List>
                    <Button
                        variant='contained'
                        color='secondary'
                        sx={{ mb: 3 }}
                        startIcon={<BackspaceOutlinedIcon />}
                        onClick={() => navigate('/gm')}
                    >
                        Retour
                    </Button>
                </Paper>
                <Dialog
                    open={open}
                    component="form"
                    onSubmit={(e) => {
                        e.preventDefault()
                        const userData = {
                            name,
                            email
                        };

                        dispatch(updateUser({
                            data: userData,
                            id: userInfo._id
                        }));

                        if(isError) {
                            toast.error(message)
                        }

                        if(isSuccess) {
                            navigate('/gm')
                            toast.success('Les données du GameMaster '+userInfo.name+' a bien été mis à jour')
                        }
                    }}
                    onClose={handleCloseModal}
                    onBackdropClick={handleCloseModal}
                    sx={{ p:2, display: "flex", justifyContent: "center" }}
                >
                    <DialogTitle
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{mt: 2, mb:1, color: 'white', textAlign: 'center', fontSize: {xs: '18px', md: 'x-large'}, width: "100%"}}
                    >
                        Modifier les données de {userInfo.name}

                    </DialogTitle>
                    <DialogContent
                        sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap", textAlign: "center"}}
                    >
                        <TextField
                            sx={{ my: 2 }}
                            autoFocus
                            variant="outlined"
                            fullWidth
                            name="name"
                            placeholder={userInfo.name}
                            label="nom"
                            value={name}
                            onChange={onChange}
                        />
                        <span style={ {width: '100%' }} />
                        <TextField
                            sx={{ my:2 }}
                            type="email"
                            placeholder={userInfo.email}
                            variant="outlined"
                            multiline
                            fullWidth
                            name="email"
                            label="Email"
                            value={email}
                            onChange={onChange}
                        />
                        <span style={ {width: '100%' }} />
                        <Button variant='contained'
                                color='secondary'
                                sx={{ m: 1 }}
                                startIcon={<BackspaceOutlinedIcon />}
                                onClick={handleCloseModal}
                        >
                            Retour
                        </Button>
                        <Button variant='contained'
                                color='success'
                                sx={{ m: 1 }}
                                endIcon={<ExitToAppOutlinedIcon />}
                                type='submit'
                        >
                            Modifier
                        </Button>
                    </DialogContent>
                </Dialog>
            </Box>
            <Footer />
        </>
    );
};

export default ModifyGm;