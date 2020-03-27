import React, { Component } from "react";
import Welcome from "./components/Welcome";
import Navbar from "./components/Navbar";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Main from "./components/Main";
import NewEvent from "./components/event/NewEvent";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import { connect } from "react-redux";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar></Navbar>
          <Route exact path="/">
            {this.props.isAuthenticated ? <Main /> : <Welcome />}
          </Route>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/newEvent" component={NewEvent} />
        </div>
      </Router>
    );
  }
}
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps)(App);
