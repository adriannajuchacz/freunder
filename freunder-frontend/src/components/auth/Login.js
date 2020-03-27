import React, { Component } from "react";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Alert from '@material-ui/lab/Alert';
import { connect } from "react-redux";
import { login } from "../../actions/authActions";
import PropTypes from "prop-types";

export class Login extends Component {
  constructor() {
    super();
    this.state = {
    email: '',
    password: '',
    msg: null
  }

  }
  onChange = e => {
    this.setState({[e.target.name]: e.target.value});
  };

  onSubmit = () => {
    const {email, password} = this.state
    this.props.login({email, password})
  };

  componentDidUpdate(prevProps) {
    const { error } = this.props
    const { isAuthenticated } = this.props
    if (error !== prevProps.error) {
      if(error.id === 'LOGIN_FAIL') {
        this.setState({msg: error.msg.message})
      } else {
        this.setState({msg: null});
      }
    }
    if (isAuthenticated) {
      this.props.history.push('/main')
    }
  }
  render() {
    return (
      <div>
        <h3>Log into the app with your email & password:</h3>
        <Grid container justify="center" alignItems="center">
          <Grid item md={6} xs={10}>
            <Box borderColor="primary.main" borderRadius={16} p={4} border={1}>
              <form>
                {this.state.msg ? <Alert severity="error">{this.state.msg}</Alert> : null}                
                <FormControl fullWidth>
                  <TextField
                    margin="normal"
                    name="email"
                    label="email"
                    onChange={this.onChange}
                  />
                  <br />
                  <TextField
                    margin="normal"
                    name="password"
                    type="password"
                    label="password"
                    onChange={this.onChange}
                  />
                  <br />
                </FormControl>
                <Grid container justify="flex-end">
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    margin="normal"
                    onClick={this.onSubmit}
                  >
                    Log in
                  </Button>
                </Grid>
              </form>
            </Box>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Login.propTypes = {
  error: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  error: state.error,
  isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStateToProps, { login })(Login);
