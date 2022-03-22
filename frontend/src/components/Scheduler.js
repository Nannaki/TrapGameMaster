import React, {useEffect} from 'react';
import {DayPilot, DayPilotScheduler} from "daypilot-pro-react";
import {getUsersAvailblity} from "../features/schedule/scheduleSlice";
import {useDispatch, useSelector} from "react-redux";
import {getUsers} from "../features/auth/authSlice";

const Scheduler = () => {

    const dispatch = useDispatch();
    const {usersAvailblity} = useSelector((state) => state.schedule);
    const {users} = useSelector((state) => state.auth)
    const ressources = [];

    useEffect(() => {

        dispatch(getUsers());
        dispatch(getUsersAvailblity({month: 2, year: 2022}));

    },[dispatch])

    if(users) {
        users.map((user) => {
            ressources.push({
                name: user.name,
                id: user._id,
            })
        })
    }


    const createTimeline = () => {
        const days = DayPilot.Date.today().daysInMonth();
        const start = DayPilot.Date.today().firstDayOfMonth();

        const result = [];
        for (let i = 0; i < days; i++) {
            const day = start.addDays(i);
            result.push({
                start: day.addHours(9),
                end: day.addHours(14)
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


    return (
        <DayPilotScheduler
            locale={"fr-ch"}
            startDate={DayPilot.Date.today().firstDayOfMonth()}
            days={DayPilot.Date.today().daysInMonth()}
            scale={"Manual"}
            timeHeaders={[
                {groupBy: "Month"},
                {groupBy: "Day", format: "dddd d/M"},
                {groupBy: "Cell"}
            ]}
            timeline={createTimeline()}
            businessBeginsHour={9}
            businessEndsHour={24}
            cellWidth={130}
            eventHeight={40}
            headerHeight={30}
            treeEnabled={true}
            rowHeaderColumns={[
                {name: "GameMaster"}
            ]}
            rowHeaderColumnDefaultWidth={100}
            resources={ressources}
        />
    );
};

export default Scheduler;



