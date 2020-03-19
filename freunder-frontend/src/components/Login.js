import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { login } from '../actions/authActions';

export class Login extends Component {
  render() {
    return (
      <form className="sth" noValidate autoComplete="off">
        <TextField id="standard-basic" label="Standard" />
        <TextField id="standard-basic" label="Standard" />
        <Button variant="contained" onClick={login()}>
          Login
        </Button>
      </form>
    );
  }
}

export default connect(null, { login })(Login);
