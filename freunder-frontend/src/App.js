import React, { Component } from "react";
import EventList from "./components/EventList";
import "./App.css";

class App extends Component {
  state = {
    events: [
      {
        id: 1
      },
      {
        id: 2
      },
      {
        id: 3
      }
    ]
  };
  render() {
    return (
      <div className="App">
        <EventList events={this.state.events}/>
      </div>
    );
  }
}

export default App;
