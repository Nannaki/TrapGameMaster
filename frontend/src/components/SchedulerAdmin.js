import React, {Component} from 'react';
import {DayPilot, DayPilotScheduler} from "daypilot-pro-react";
import SchedulerDraggableItemRooms from "./SchedulerDraggableItemRooms";
import axios from "axios";
import {Box, Button, Card, FormHelperText, Paper} from "@mui/material";
import SchedulerDraggableItemPriorities from "./SchedulerDraggableItemPriorities";
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';


if(localStorage.getItem("user")) {
    axios.defaults.headers.common = {
        Authorization: JSON.parse(localStorage.getItem("user")).token
    };
}


class SchedulerAdmin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            locale: "fr-ch",
            startDate: DayPilot.Date.today().firstDayOfMonth(),
            days: DayPilot.Date.today().daysInYear(),
            scale: "Manual",
            timeHeaders: [{groupBy: "Month"},{groupBy: "Day", format: "d/M"},{groupBy: "Cell"}],
            contextMenu: new DayPilot.Menu({
                    items: [
                        {text: "Effacer", onClick: args => this.deleteEvent(args)}
                    ]
                }),
            timeline: this.createTimeline(),
            businessEndsHour: 24,
            cellWidth: 30,
            eventHeight: 30,
            headerHeight: 30,
            rowHeaderWidth: 100,
            rowMarginBottom: 15,
            treeEnabled: true,
            eventResizeHandling: "disabled",
            rowHeaderColumns: [
                {name: "GameMaster", display: "gameMaster"},
                {name: "Langues", display: "langues"},
            ],
            rooms: [],
            currentEvents: null,
            resourceBubble: new DayPilot.Bubble( {
                position: "Mouse",
                onLoad: async function (args) {
                    args.async = true;
                    const user = await axios.get("http://localhost:5000/api/users/getOne"+args.source.id);
                    if(user) {
                        args.html = user.data.rooms.join(" | ")
                        args.loaded()
                    }
                },

            }),
            onEventMove: async function (args) {
                console.log(args)
                this.events.remove(args.e.data)
                await axios.delete("http://localhost:5000/api/schedule/deleteEvent"+args.e.data.id)
            },
            onEventMoved: function (args) {
                args.e.data.id = DayPilot.guid()
                const eventData = {
                    id: args.e.data.id,
                    start: args.e.data.start,
                    end: args.e.data.end,
                    text: args.e.data.text,
                    resource: args.e.data.resource,
                    backColor: args.e.data.backColor,
                }

                async function addNewEventInBdd(){
                    await axios.post("http://localhost:5000/api/schedule/addNewEventSchedule", eventData)

                }
               addNewEventInBdd()

            },
        };
    }

    componentDidMount() {
        this.loadUsers();
        this.loadEvents();
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

            resources.push({
                fontColor: "#2e7d32",
                id: user._id,
                gameMaster: user.name,
                langues: "Fr / Ang",
            })
        })
        this.setState({users: users.data})
        return this.setState({resources:resources})
    }

    async loadEvents() {
        const events = await axios.get("http://localhost:5000/api/schedule/getEvents")
        const previousMonth = await axios.post("http://localhost:5000/api/schedule/getUserAvailblity", {month: DayPilot.Date.today().addMonths(-1).getMonth(), year: DayPilot.Date.today().getYear()});
        const currentMonth = await axios.post("http://localhost:5000/api/schedule/getUserAvailblity", {month: DayPilot.Date.today().getMonth(), year: DayPilot.Date.today().getYear()});
        const nextMonth = await axios.post("http://localhost:5000/api/schedule/getUserAvailblity", {month: DayPilot.Date.today().addMonths(1).getMonth(), year: DayPilot.Date.today().getYear()});
        const finalEvents = [];

        events.data.map((event) => {
            finalEvents.push({
                id: event.id,
                start: event.start,
                end: event.end,
                resource: event.resource,
                text: event.text,
                barHidden: true,
                backColor: event.backColor,
                fontColor: "white",
            })
        })

        previousMonth.data.map((shifts) => {
            shifts.availblity.map((shift) => {
                finalEvents.push({
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

        currentMonth.data.map((shifts) => {
            shifts.availblity.map((shift) => {
                finalEvents.push({
                    id: Math.random() + parseInt(shift.id),
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

        nextMonth.data.map((shifts) => {
            shifts.availblity.map((shift) => {
                finalEvents.push({
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

        return this.setState({events: finalEvents})
    }

    async deleteEvent(args) {
        this.scheduler.events.remove(args.source)
        await axios.delete("http://localhost:5000/api/schedule/deleteEvent"+args.source.data.id)


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

    createTimelineNext(next) {

        let days = next.daysInYear();
        let start = next

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

    createTimelinePrevious(previous) {

        let days = previous.daysInYear();
        let start = previous

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
                    <Paper
                        elevation={18}
                        sx={{mb: "1px"}}
                    >
                        <Button
                            color="third"
                            startIcon={<SkipPreviousIcon />}
                            onClick={(e) => {
                                const previous = this.state.startDate.addMonths(-1);
                                this.setState({
                                    startDate: previous,
                                    days: previous.daysInYear(),
                                    timeline: this.createTimelinePrevious(previous)
                                })
                            }}
                        >
                        </Button>
                        <Button
                            color="third"
                            endIcon={<SkipNextIcon />}
                            onClick={() => {
                                const next = this.state.startDate.addMonths(1);
                                this.setState({
                                    startDate: next,
                                    days: next.daysInYear(),
                                    timeline: this.createTimelineNext(next)
                                })
                            }}
                        >
                        </Button>
                    </Paper>
                    <span style={{width: "100%"}}/>
                    <DayPilotScheduler
                        width="90%"
                        {...config}
                        ref={component => {
                            this.scheduler = component && component.control
                        }}
                        heightSpec="Max"
                    />
                    <Box
                        sx={{display: "flex",flexWrap: "wrap", justifyContent: "center"}}
                    >
                        <Card
                            elevation={18}
                            sx={{width: "40%", m:2, display: "flex", flexWrap:"wrap", justifyContent:"center", alignItems:"center"}}
                        >
                            {rooms.map((room, index) => (
                                <SchedulerDraggableItemPriorities key={room.id} text={("P")+(index+1).toString()} color="#388e3c" />
                            ))}
                            <span style={{width: "100%"}}/>
                            <FormHelperText
                                sx={{m: "0 auto", mt: 1, width: "100%", textAlign: "center"}}
                            >
                                Glissez la priorité sur le planning pour l'attribuer
                            </FormHelperText>
                        </Card>
                        <Card
                            elevation={18}
                            sx={{width: "40%", m:2, display: "flex", flexWrap:"wrap", justifyContent:"center", alignItems:"center"}}
                        >
                            {rooms.map((el) => (
                                <SchedulerDraggableItemRooms key={el.id} text={el.name} color={el.color}/>
                            ))}
                            <SchedulerDraggableItemRooms key="formation" text="formation" color="#ec407a" />
                            <span style={{width: "100%"}}/>
                            <FormHelperText
                                sx={{m: "0 auto", mt: 1, width: "100%", textAlign: "center"}}
                            >
                                Glissez la salle sur le planning pour l'attribuer
                            </FormHelperText>
                        </Card>
                    </Box>

                </Box>
            </>
        )
    }
}

export default SchedulerAdmin

