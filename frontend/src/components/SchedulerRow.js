import React from 'react';

export class SchedulerRow extends React.Component {
    render() {
        return <div style={{fontWeight: "bold", color:"black"}} >{this.props.gameMaster}</div>;
    }
}


