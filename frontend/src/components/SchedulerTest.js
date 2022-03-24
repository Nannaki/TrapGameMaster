import React, {Component} from 'react';
import {DayPilot, DayPilotScheduler} from "daypilot-pro-react";
import SchedulerDraggableItem from "./SchedulerDraggableItem";
import axios from "axios";
import {Box, Card, FormHelperText} from "@mui/material";

class SchedulerTest extends Component {
    constructor(props) {
        super(props);

        this.state = {
            locale: "fr-ch",
            startDate: DayPilot.Date.today().firstDayOfMonth(),
            days: DayPilot.Date.today().daysInMonth(),
            scale: "Manual",
            timeHeaders: [{groupBy: "Month"},{groupBy: "Day", format: "d/M"},{groupBy: "Cell"}],
            timeline: this.createTimeline(),
            businessEndsHour: 24,
            cellWidth: 30,
            eventHeight: 50,
            headerHeight: 30,
            rowHeaderWidth: 100,
            treeEnabled: true,
            rowHeaderColumns: [
                {name: "GameMaster", display: "gameMaster"},
                {name: "Langues", display: "langues"},
            ],
            rooms: [],
            resourceBubble: new DayPilot.Bubble( {
                position: "Mouse",
                animation: "Fast",
                onLoad: async function (args) {
                    args.async = true;
                    const user = await axios.get("http://localhost:5000/api/users/getOne"+args.source.id);
                    if(user) {
                        let rooms = user.data.rooms.join(" | ")
                        args.html = rooms
                        args.loaded()
                    }
                },

            })
        };

    }

    componentDidMount() {
        this.loadUsers();
        this.loadAvail();
        this.getRoomsAvail();
    }

    async getRoomsAvail() {
        const rooms = await axios.get("http://localhost:5000/api/rooms/show");
        const availRooms = [];

        rooms.data.map((room) => {
            availRooms.push({
                id: room._id,
                name: room.name,
                color: room.color,
                createdAt: room.createdAt
            })
        })

        return this.setState({rooms: availRooms})
    }


    async loadUsers() {
        const users = await axios.get("http://localhost:5000/api/users/show");
        const resources = [];

        users.data.map((user) =>  {
            let rooms;
            rooms = user.rooms.join(" | ")

            if(!user.isAdmin) {
                resources.push({
                    fontColor: "#2e7d32",
                    id: user._id,
                    gameMaster: user.name,
                    langues: "Fr / Ang",
                })
            }

        })
        return this.setState({resources:resources})
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

        return this.setState({events: finalAvail})
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

        const rooms = this.state.rooms;
        const {...config} = this.state;

        return (
            <>
                <Box
                    sx={{display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center"}}
                >
                    <span style={{width: "100%"}}/>
                    <DayPilotScheduler
                        width="90%"
                        {...config}
                        ref={component => {
                            this.scheduler = component && component.control
                        }}
                        heightSpec="Max"
                    />
                    <Card
                        elevation={18}
                        sx={{mt: 4, display: "flex",flexWrap: "wrap", justifyContent: "center", width: "20%"}}
                    >
                        {rooms.map((el) => (
                            <SchedulerDraggableItem key={el.id}  text={el.name} color={el.color} backColor={el.color}/>
                        ))}
                        <FormHelperText
                            sx={{m: "0 auto", mt: 3, width: "100%", textAlign: "center"}}
                        >
                            Glissez la salle sur le planning pour l'attribuer
                        </FormHelperText>
                    </Card>
                </Box>
            </>
        )
    }
}

export default SchedulerTest

