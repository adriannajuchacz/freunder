import React, { Component } from "react";
import Welcome from "./components/Welcome";
import Navbar from "./components/Navbar";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Main from "./components/Main"
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import "./App.css";
import { connect } from "react-redux";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar></Navbar>
          <Route exact path="/">
            {this.props.isAuthenticated ? <Redirect to="/main" /> : <Welcome />}
          </Route>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/main" component={Main} />
        </div>
      </Router>
    );
  }
}
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps)(App);
