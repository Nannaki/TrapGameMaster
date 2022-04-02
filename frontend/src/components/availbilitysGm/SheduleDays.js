//Imports
import CheckBoxForScheduleAvailablity from "./CheckBoxForScheduleAvailablity";
import {Container, Typography} from "@mui/material";
import {useState} from "react";

//Instanciation du composent avec props (parent: Availablity.js)
const SheduleDays = (props) => {

    //Déclarations de variable et constante
    let shifts = ["T09:00:00", "T14:00:00", "T19:00:00"];
    const [allDay, setAllDay] = useState(false)

    //JSX
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