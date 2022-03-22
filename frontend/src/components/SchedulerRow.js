import React from 'react';

export class SchedulerRow extends React.Component {
  render() {
    return <div style={{fontWeight: "bold", color:"green"}} >{this.props.row.name}</div>;
  }
}
