import React, { Component } from "react";
import EventList from "./event/EventList";
import Calendar from "./event/EventCalendar";
import ToggleButtons from "./building-blocks/ToggleButtons";

export class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { isEventsOn: true };

    // This binding is necessary to make `this` work in the callback
    this.setEvents = this.setEvents.bind(this);
    this.setCalendar = this.setCalendar.bind(this);
  }
  handleLanguage = newAlignment => {
    if (newAlignment) {
      let isEventsOn = newAlignment === "left";
      this.setState({ isEventsOn: isEventsOn });
    }
  };
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
        <ToggleButtons onSelectLanguage={this.handleLanguage}></ToggleButtons>
        {this.state.isEventsOn ? <EventList /> : <Calendar />}
      </div>
    );
  }
}

export default Main;
