import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import EventList from "./event/EventList";
import Calendar from "./event/EventCalendar";
import ButtonGroup from "@material-ui/core/ButtonGroup";

export class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { isEventsOn: true };

    // This binding is necessary to make `this` work in the callback
    this.setEvents = this.setEvents.bind(this);
    this.setCalendar = this.setCalendar.bind(this);
  }
  setEvents() {
    this.setState(state => ({
      isEventsOn: true
    }));
  }
  setCalendar() {
    this.setState(state => ({
      isEventsOn: false
    }));
  }
  render() {
    return (
      <div>
        <ButtonGroup color="primary" aria-label="outlined primary button group">
          <Button onClick={this.setEvents}>Events</Button>
          <Button onClick={this.setCalendar}>Calendar</Button>
        </ButtonGroup>
        {this.state.isEventsOn ? <EventList /> : <Calendar />}
      </div>
    );
  }
}

export default Main;
