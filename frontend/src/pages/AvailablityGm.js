import Header from "../components/Header";
import {
    Box,
    Card,
    FormControl,
    InputLabel,
    Select,
    Typography,
    MenuItem,
    FormHelperText,
    Button,
    FormLabel, FormGroup, FormControlLabel, Checkbox
} from "@mui/material";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {getActualsMonths, reset} from "../features/schedule/scheduleSlice";

const AvailablityGm = () => {

    let today = new Date();
    const [formData, setFormData] = useState( {
        month: today.getMonth(),
        year: today.getFullYear(),
    });
    const {month, year, yearPlusOne} = formData;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { months } = useSelector((state) => state.schedule);

    useEffect(() => {
        dispatch(getActualsMonths())
    }, [dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    };

    const onSubmit = (e) => {
        e.preventDefault()


        setFormData({
            month: today.getMonth(),
            year: today.getFullYear()
        })
        console.log(formData)
    }








    return (
        <>
            <Header />
            <Box
                sx={{ mt: 12, display: "flex", justifyContent:'center', flexWrap: 'wrap', textAlign: 'center' }}

            >
                <Card
                    component="form"
                    elevation={8}
                    square
                    onSubmit={(e)=>onSubmit(e)}
                    sx={{ width: "60%", display: "flex", flexWrap: "wrap", justifyContent:'center', alignItems: 'center' }}
                >
                    <Typography
                        variant='h6'
                        noWrap
                        component='div'
                        sx={{mt: 3, mb:3, color: 'white', textAlign: 'center', fontSize: {xs: '18px', md: 'x-large'}}}
                    >
                        <HowToRegOutlinedIcon sx={{ fontSize: {xs: "18px", md: "30px"} }}/> Envoyer mes disponibilités
                    </Typography>
                    <span style={{width: "100%"}} />
                    <FormControl
                        sx={{ width: {xs: "120px", md: "220px"}, display: "flex", flexWrap: "wrap", justifyContent:'center' }}
                    >
                        <InputLabel
                            id="month"
                            sx={{fontSize: {xs: '14px', md: '16px'}}}
                        >
                            Mois
                        </InputLabel>
                        <Select
                            labelId="month"
                            name="month"
                            id="monthSelect"
                            value={month}
                            label="Mois"
                            onChange={onChange}
                        >
                            {months.map((month) => (
                                <MenuItem key={month.month} value={month.monthNumeric}>{month.month}</MenuItem>
                            ))}
                        </Select>
                        <FormHelperText
                            sx={{mb:2, fontSize: {sx: "12px", md: "14px"}}}
                        >
                            Choisissez le mois
                        </FormHelperText>
                    </FormControl>
                    <span style={{width: "100%"}} />
                    <FormControl
                        sx={{ width: {xs: "120px", md: "220px"}, display: "flex", flexWrap: "wrap", justifyContent:'center' }}
                    >
                        <InputLabel
                            id="year"
                            sx={{fontSize: {xs: '14px', md: '16px'}}}
                        >
                            Année
                        </InputLabel>
                        <Select
                            labelId="year"
                            id="yearSelect"
                            name="year"
                            value={year}
                            label="Année"
                            onChange={onChange}
                        >
                            <MenuItem value={year}>{year}</MenuItem>
                            <MenuItem value={year+1}>{year+1}</MenuItem>
                        </Select>
                        <FormHelperText
                            sx={{mb:2, fontSize: {sx: "12px", md: "14px"}}}
                        >
                            Choisissez l'année
                        </FormHelperText>
                    </FormControl>
                    <span style={{width: "100%"}} />
                    <Button
                        variant='contained'
                        color='success'
                        sx={{ my: 2 }}
                        type="submit"
                        endIcon={<ExitToAppOutlinedIcon />}
                    >
                        Planning
                    </Button>
                </Card>
                <span style={{width: "100%"}} />

                <Box
                    sx={{ width: {xs: "80%", md: "60%"}, mt: 4, display: "flex", justifyContent:'center', flexWrap: 'wrap', textAlign: 'center' }}
                >

                    <Card //TODO boucler ici
                        elevation={8}
                        //key={day}
                        square
                        sx={{border: '1px solid #f1f1f1', m: 2, width: {xs: "80%", md: "40%"}, display: "flex", flexWrap: "wrap", justifyContent:'center', alignItems: 'center', textAlign: "center" }}
                    >
                        <span style={{width: {xs: "80%", md: "40%"}}} />
                        <FormControl color="secondary" sx={{textAlign: "center", width: {xs: "260px", md: "360px"},  display:"flex", flexWrap: "wrap", justifyContent:"center", alignItems: "center"}}>
                            <FormLabel
                                component="legend"
                                sx={{ my:2 ,textAlign: "center", fontSize: {sx: "16px", md: "20px"}, borderBottom: '1px solid #f1f1f1', width: "70%"}}
                            >
                                JOUR
                            </FormLabel>
                            <FormGroup>
                                <FormControlLabel
                                    //key={day}
                                    control={
                                        <Checkbox
                                            //checked={roomChecked.indexOf(room.name) > -1}
                                            name="roomChecked"
                                            color="secondary"
                                            //onChange={(e) => {onCheckRoom(e, room.name)}}
                                            //value={room.name}
                                        />
                                    }
                                    label="8h - 14h" />

                                <FormControlLabel
                                    //key={room._id}
                                    control={
                                        <Checkbox
                                            //checked={roomChecked.indexOf(room.name) > -1}
                                            name="roomChecked"
                                            color="secondary"
                                            //onChange={(e) => {onCheckRoom(e, room.name)}}
                                            //value={room.name}
                                        />
                                    }
                                    label="14h-19h" />

                                <FormControlLabel
                                    //key={room._id}
                                    control={
                                        <Checkbox
                                            //checked={roomChecked.indexOf(room.name) > -1}
                                            name="roomChecked"
                                            color="secondary"
                                            //onChange={(e) => {onCheckRoom(e, room.name)}}
                                            //value={room.name}
                                        />
                                    }
                                    label="19h - 00h" />
                            </FormGroup>
                        </FormControl>
                        <span style={{width: "100%"}} />
                        <FormHelperText>Cochez si vous êtes disponibles</FormHelperText>
                    </Card>
                </Box>
            </Box>
        </>
    );
};

export default AvailablityGm;