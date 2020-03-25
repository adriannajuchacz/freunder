import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

export class Welcome extends Component {
  render() {
    return (
      <div>
        <h1>WELCOME.JS</h1>
        <Link to="/login">
          <Button variant="contained">Login</Button>
        </Link>

        <Link to="/register">
          <Button variant="contained">Register</Button>
        </Link>
      </div>
    );
  }
}

export default Welcome;
