import React from 'react';
import {DayPilot} from "daypilot-pro-react";
import {Chip} from "@mui/material";

const SchedulerDraggableItem = (props) => {

    return (
        <>
            <Chip
                sx={{ m:1, backgroundColor: props.color}}
                label={props.text}
                ref={element => {
                    if(!element) {
                        return;
                    }
                    DayPilot.Scheduler.makeDraggable({
                        element: element,
                        id: props.day,
                        text: props.text.substring(0,3),
                        keepElement: true,
                        barHidden: true,
                        backColor: props.color,
                    })
                }}
            >
            </Chip>
        </>
    );
};

export default SchedulerDraggableItem;