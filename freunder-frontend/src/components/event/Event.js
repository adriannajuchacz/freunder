import React, { Component } from "react";

class Event extends Component {
  render() {
    return (
      <div>
        <h1>{this.props.event.name}</h1>
      </div>
    );
  }
}

export default Event;
