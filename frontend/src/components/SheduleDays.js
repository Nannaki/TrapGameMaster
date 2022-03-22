import CheckBoxForScheduleAvailablity from "./CheckBoxForScheduleAvailablity";
import {Container, Typography} from "@mui/material";
import {useEffect, useState} from "react";


const SheduleDays = (props) => {

    let shifts = ["T09:00:00", "T14:00:00", "T19:00:00"];
    const [allDay, setAllDay] = useState(false)


    return (
        <>
            <Typography
                component="div"
                sx={{width: "100%", mt: 2, mb: 2, fontSize: {xs: '18px', md: 'large'}, cursor: "pointer" }}
                onClick={()=>setAllDay(!allDay)}
            >{props.date}</Typography>

            {!props.allDay ? (
            <Container
                sx={{maxWidth:"80%", display: "flex", justifyContent: "center", flexWrap: "nowrap"}}
            >
                <CheckBoxForScheduleAvailablity name={props.unchanged +shifts[0]} alldayCheck={allDay} />
                <CheckBoxForScheduleAvailablity name={props.unchanged +shifts[1]} alldayCheck={allDay} />
                <CheckBoxForScheduleAvailablity name={props.unchanged +shifts[2]} alldayCheck={allDay} />
            </Container>
            ) : (
                <CheckBoxForScheduleAvailablity name={props.date + "allDay"} alldayCheck={allDay} />
            )}

        </>
    );
};

export default SheduleDays;