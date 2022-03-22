import React, {Component} from 'react';
import {DayPilot, DayPilotScheduler} from "daypilot-pro-react";
import {SchedulerRow} from "./SchedulerRow";
import axios from "axios";


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
                {name: "GameMaster"},
                {name: "Langues", display: "langues", width: 50}
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
                    name: user.name,
                    langues: "Fr / Ang",
                    expanded: true,
                    children: [
                        {
                            name: rooms,

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

        const days = DayPilot.Date.today().daysInMonth();
        const start = DayPilot.Date.today().firstDayOfMonth();

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
        var {...config} = this.state;
        return (
            <div>
                <DayPilotScheduler
                    {...config}
                    ref={component => {
                        this.scheduler = component && component.control
                    }}
                />
            </div>
        )
    }
}

export default SchedulerTest

