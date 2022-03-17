import CheckBoxForScheduleAvailablity from "./CheckBoxForScheduleAvailablity";
import {Container, Typography} from "@mui/material";


const SheduleDays = (props) => {

    let shifts = [1,2,3];

    return (
        <>
            <Typography
                component="div"
                sx={{width: "100%", mt: 2, fontSize: {xs: '18px', md: 'large'} }}
            >{props.date}</Typography>
            <Container
                sx={{maxWidth:"80%", display: "flex", justifyContent: "center", flexWrap: "nowrap"}}
            >
                <CheckBoxForScheduleAvailablity name={props.date +" "+shifts[0]} />
                <CheckBoxForScheduleAvailablity name={props.date +" "+shifts[1]} />
                <CheckBoxForScheduleAvailablity name={props.date +" "+shifts[2]} />
            </Container>

        </>
    );
};

export default SheduleDays;