import React, {useState} from 'react';
import {Box, Button, Paper, TextField, Typography} from "@mui/material";
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password:'',
    });

    const { email, password } = formData;

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
                <Typography variant='h4' component='div' align='center'><VpnKeyOutlinedIcon sx={{ fontSize: '28px', marginTop: '5%'}}/> Login</Typography>
                <Box
                    component='form'
                    sx={{ m: 2 ,display: "flex", justifyContent:'center', flexWrap: 'wrap' }}
                    noValidate
                    onSubmit={onSubmit}
                >
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

export default Login;