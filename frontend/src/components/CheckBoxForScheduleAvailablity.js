import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import React, {useState} from 'react';
import {Checkbox} from "@mui/material";
import {green, amber} from "@mui/material/colors";

const CheckBoxForScheduleAvailablity = (props) => {

    const [dispo, setDispo] = useState("available");
    const [icon, setIcon] = useState(<EventAvailableIcon/>);
    const [checked, setChecked] = useState(false);

    const handleDispo = (e) => {
        if(e.target.value === "available") {
            setDispo("nonAvailable");
            setIcon(<EventBusyIcon/>);
            setChecked(!checked)
        }
        else{
            setDispo("available")
            setIcon(<EventAvailableIcon/>)
            setChecked(!checked)
        }

    }

    return (
        <>
            <Checkbox
                name={props.name}
                value={dispo}
                checked={checked}
                onChange={handleDispo}
                icon={<EventAvailableIcon />}
                checkedIcon={<EventBusyIcon />}
                sx={{
                    color: green[800],
                    '&.Mui-checked': {
                        color: amber[700],
                    },
                    '& .MuiSvgIcon-root': { fontSize: {xs: "28px", md:"32px"} },

                }}
            />
        </>
    );
};

export default CheckBoxForScheduleAvailablity;