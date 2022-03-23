import React, {Component} from 'react';
import {DayPilot, DayPilotScheduler} from "daypilot-pro-react";
import SchedulerDraggableItem from "./SchedulerDraggableItem";
import axios from "axios";
import {Card, Box, Typography} from "@mui/material";



class SchedulerTest extends Component {
    constructor(props) {
        super(props);

        this.state = {
            locale: "fr-ch",
            startDate: DayPilot.Date.today().firstDayOfMonth(),
            days: DayPilot.Date.today().daysInMonth(),
            scale: "Manual",
            timeHeaders: [{groupBy: "Month"},{groupBy: "Day", format: "dddd d/M"},{groupBy: "Cell"}],
            timeline: this.createTimeline(),
            businessEndsHour: 24,
            cellWidth: 80,
            eventHeight: 40,
            headerHeight: 30,
            treeEnabled: true,
            rowHeaderColumns: [
                {name: "GameMaster", display: "gameMaster"},
                {name: "Langues", display: "langues"},
            ],

        };

    }

    componentDidMount() {
        this.loadUsers();
        this.loadAvail();
    }


    async loadUsers() {
        const users = await axios.get("http://localhost:5000/api/users/show");
        const resources = [];

        users.data.map((user) => {
            let rooms;
            rooms = user.rooms.join(" | ")

            if(!user.isAdmin) {
                resources.push({
                    fontColor: "#2e7d32",
                    id: user._id,
                    gameMaster: user.name,
                    langues: "Fr / Ang",
                    expanded: true,
                    children: [
                        {
                            gameMaster: rooms,
                            id: user.createdAt
                        }
                    ]

                })
            }

        })

        this.setState({resources:resources})
    }

    async loadAvail() {
        const response = await axios.post("http://localhost:5000/api/schedule/getUserAvailblity", {month: 2, year:2022});
        const finalAvail = [];

        response.data.map((shifts) => {
            shifts.availblity.map((shift) => {
                finalAvail.push({
                    id: Math.random()+parseInt(shift.id),
                    start: shift.shift,
                    end: shift.date,
                    resource: shift.id,
                    barHidden: true,
                    backColor: "#ffb300",
                    borderColor: "darker",
                    nonBlocking: true,
                    line: 0,
                    height: 30,
                    moveDisabled: true
                })
            })

        })

        this.setState({events: finalAvail})
    }

    createTimeline() {

        let days = DayPilot.Date.today().daysInMonth();
        let start = DayPilot.Date.today().firstDayOfMonth();

        const result = [];
        for (let i = 0; i < days; i++) {
            const day = start.addDays(i);
            result.push({
                start: day.addHours(9),
                end: day.addHours(14),
            });
            result.push({
                start: day.addHours(14),
                end: day.addHours(19)
            });
            result.push({
                start: day.addHours(19),
                end: day.addHours(24)
            });
        }
        return result;
    }


    render() {
        const {...config} = this.state;
        return (
            <>
                <Box
                    sx={{display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center"}}
                >
                    <Card
                        elevation={8}
                    >
                        <Typography>
                            Déplacer les salles ou les priorités dans le shift correspondant
                        </Typography>
                        <SchedulerDraggableItem id={101} text="Room1" color={"primary"}/>
                    </Card>
                    <span style={{width: "100%"}}/>
                    <DayPilotScheduler
                        width={"90%"}
                        {...config}
                        ref={component => {
                            this.scheduler = component && component.control
                        }}
                        heightSpec="Max"
                    />
                </Box>
            </>
        )
    }
}

export default SchedulerTest

