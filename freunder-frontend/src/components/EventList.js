import React, { Component } from "react";
import Event from "./Event";

class EventList extends Component {
  render() {
    return this.props.events.map((event) => (
        <Event event={event}/>
    ));
  }
}

export default EventList;
