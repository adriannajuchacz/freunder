import React, { Component } from "react";
import { Provider } from "react-redux";
import Login from "./components/Login";
import EventList from "./components/EventList";
import "./App.css";
import store from "./store";


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
      <Provider store={store}>
        <div className="App">
          <Login />
          <EventList events={this.props.events} />
        </div>
      </Provider>
    );
  }
}


export default App;
