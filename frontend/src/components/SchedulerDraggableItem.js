import React from 'react';
import {DayPilot} from "daypilot-pro-react";
import {Chip} from "@mui/material";

const SchedulerDraggableItem = (props) => {

    return (
        <>
            <Chip
                label={props.text}
                color={props.color}
                ref={element => {
                    if(!element) {
                        return;
                    }
                    DayPilot.Scheduler.makeDraggable({
                        element: element,
                        id: props.id,
                        text: props.text,
                    })
                }}
            >
            </Chip>
        </>
    );
};

export default SchedulerDraggableItem;