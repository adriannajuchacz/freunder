import React, { Component } from "react";

class Event extends Component {
  render() {
    return (
      <div>
        <h1>{this.props.event.id}</h1>
      </div>
    );
  }
}

export default Event;
