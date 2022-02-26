import React, {useState} from 'react';
import {Box, Button, Checkbox, FormControlLabel, Paper, TextField, Typography} from "@mui/material";
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';

const RegisterGm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password:'',
        password2: '',
        isAdmin: false
    });

    const { name, email, password, password2, isAdmin } = formData;

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    };

    const onSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <>
            <Paper elevation={4} sx={{ mt: 4, ml: 2, mr: 2}}>

                <Typography variant='h4' component='div' align='center'><HowToRegOutlinedIcon sx={{ fontSize: '28px', marginTop: '5%'}}/> Register</Typography>
                <Box
                    component='form'
                    sx={{ m: 2 ,display: "flex", justifyContent:'center', flexWrap: 'wrap' }}
                    noValidate
                    onSubmit={onSubmit}
                     >
                    <TextField id='name'
                               required
                               label='Name'
                               variant='outlined'
                               sx={{ m: 1, width: '50%'}}
                               fullWidth
                               onChange={onChange}
                               value={name}
                               name='name'
                    />
                    <TextField id='email'
                               required
                               label='Email'
                               variant='outlined'
                               sx={{ m: 1, width: '50%'}}
                               fullWidth
                               type='email'
                               onChange={onChange}
                               value={email}
                               name='email'
                    />
                    <TextField id='password'
                               required
                               label='Password'
                               variant='outlined'
                               sx={{ m: 1, width: '50%'}}
                               fullWidth
                               type='password'
                               onChange={onChange}
                               value={password}
                               name='password'
                    />
                    <TextField id='password2'
                               required
                               label='Check password'
                               variant='outlined'
                               sx={{ m: 1, width: '50%'}}
                               fullWidth
                               type='password'
                               onChange={onChange}
                               value={password2}
                               name='password2'
                    />
                    <span style={ {width: '100%' }} />
                    <FormControlLabel control={
                        <Checkbox
                        onChange={onChange}
                        id='isAdmin'
                        required
                        value={isAdmin}
                        name='isAdmin'
                        />
                    }
                    label='Admin'/>
                    <span style={ {width: '100%' }} />
                    <Button variant='contained'
                            color='success'
                            sx={{ m: 3 }}
                            endIcon={<ExitToAppOutlinedIcon />}
                            type='submit'
                    >
                        Submit
                    </Button>
                </Box>
            </Paper>
        </>
    );
};

export default RegisterGm;