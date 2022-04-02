//Imports
import React from 'react';
import {DayPilot} from "daypilot-pro-react";
import {Chip} from "@mui/material";

//Instanciation du composent avec props (parent: SchedulerAdmin.js)
const SchedulerDraggableItemRooms = (props) => {

    //JSX
    return (
        <>
            <Chip
                sx={{ m: "0 auto", mt: 1, textAlign: "center", backgroundColor: props.color,}}
                label={props.text}
                ref={element => {
                    if(!element) {
                        return;
                    }
                    //makeDraggable provient de "DayPilot" et rend un composent draggable
                    DayPilot.Scheduler.makeDraggable({
                        element: element,
                        id: 0,
                        text: props.text.substring(0,3),
                        keepElement: true,
                        barHidden: true,
                        backColor: props.color,
                        fontColor: "white",
                    })
                }}
            >
            </Chip>
        </>
    );
};

export default SchedulerDraggableItemRooms;