//Imports
import React, {Component} from 'react';
import {DayPilot, DayPilotScheduler} from "daypilot-pro-react";
import axios from "axios";
import {Box, Button, Paper} from "@mui/material";
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import Footer from "./Footer";

//Ajout de l'utilisateur dans le Header pour l'autorisation d'accès aux pages
if(localStorage.getItem("user")) {
    axios.defaults.headers.common = {
        Authorization: JSON.parse(localStorage.getItem("user")).token
    };
}

//Instanciation de la classe étendu de "Component" (props de component)
export class SchedulerGm extends Component {
    constructor(props) {
        super(props);

        //Déclaration de states du constructeur
        this.state = {
            locale: "fr-ch",
            startDate: DayPilot.Date.today().firstDayOfMonth(),
            days: DayPilot.Date.today().daysInYear(),
            scale: "Manual",
            timeHeaders: [{groupBy: "Month"},{groupBy: "Day", format: "d/M"},{groupBy: "Cell"}],
            timeline: this.createTimeline(),
            businessEndsHour: 24,
            cellWidth: 30,
            eventHeight: 30,
            headerHeight: 30,
            rowHeaderWidth: 100,
            rowMarginBottom: 15,
            treeEnabled: true,
            eventResizeHandling: "disabled",
            eventMoveHandling: "disabled",
            timeRangeSelectedHandling: "disabled",
            rowHeaderColumns: [
                {name: "GameMaster", display: "gameMaster"},
                {name: "Langues", display: "langues"},
            ],
            rooms: [],
            currentEvents: null,
            resourceBubble: new DayPilot.Bubble( {
                position: "Mouse",
                //Fonction au chargement, charge un utilisateur pour obtenir des rooms (hover sur le nom du GM dans le shedule)
                onLoad: async function (args) {
                    args.async = true;
                    const user = await axios.get("http://localhost:5000/api/users/getOne"+args.source.id);
                    if(user) {
                        args.html = user.data.rooms.join(" | ")
                        args.loaded()
                    }
                },
            }),
        }
    }

    //Charge les données utilisateur, évènements et salles au montage du composent
    componentDidMount() {
        this.loadUsers();
        this.loadEvents();
        this.getRoomsAvail();
    }

    //Fonction pour charger les salles depuis la BDD
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

    //Fonction pour charger les utilisateurs depuis la BDD
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

    //Fonction pour charger les évènement depuis la BDD
    //Permet la navigation sur le Scheduler via les flèches
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

    //Crée les Shifts (9h, 14h, 19h) sur la timeline du Scheduler, selon le mois
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

    //JSX
    render() {

        //Charge les configurations du Sheduler
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
                </Box>
                <Footer />
            </>
        )
    }
}