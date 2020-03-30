import React, { Component } from "react";
import Welcome from "./components/Welcome";
import Navbar from "./components/Navbar";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Main from "./components/Main";
import NewEvent from "./components/event/NewEvent";
import { Router, Route } from "react-router-dom";
import "./App.css";
import { connect } from "react-redux";
import history from "./history";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <div className="App">
            <Navbar></Navbar>
            <Route exact path="/">
              {this.props.isAuthenticated ? <Main /> : <Welcome />}
            </Route>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/newEvent">
              {this.props.isAuthenticated ? <NewEvent /> : <Welcome />}
            </Route>
          </div>
        </MuiPickersUtilsProvider>
      </Router>
    );
  }
}
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps)(App);
