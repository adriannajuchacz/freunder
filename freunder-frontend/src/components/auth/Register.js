import React, { Component } from "react";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { register } from "../../actions/authActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Alert from "@material-ui/lab/Alert";

export class Register extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      name: "",
      password: "",
      password2: "",
      msg: []
    };
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = () => {
    const { email, name, password, password2 } = this.state;
    this.props.register({ email, name, password, password2 });
  };
  componentDidUpdate(prevProps) {
    const { error } = this.props;
    const { isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      if (error.id === "REGISTER_FAIL") {
        let errors = [];
        error.msg.messages.forEach(el => {
          errors.push(el.msg);
        });
        this.setState({ msg: errors });
      } else {
        this.setState({ msg: [] });
      }
    }
    if (isAuthenticated) {
      this.props.history.push("/");
    }
  }
  render() {
    return (
      <div>
        <Grid container justify="center" alignItems="center">
          <Grid item md={6} xs={10}>
            <Box borderColor="primary.main" borderRadius={16} p={4} border={1}>
              <form>
                {this.state.msg.map(e => (
                  <Alert severity="error">{e}</Alert>
                ))}
                <FormControl fullWidth>
                  <TextField
                    margin="normal"
                    label="email"
                    name="email"
                    onChange={this.onChange}
                  />
                  <br />
                  <TextField
                    margin="normal"
                    name="name"
                    label="name"
                    onChange={this.onChange}
                  />
                  <br />
                  <TextField
                    margin="normal"
                    type="password"
                    name="password"
                    label="password"
                    onChange={this.onChange}
                  />
                  <br />
                  <TextField
                    margin="normal"
                    type="password"
                    name="password2"
                    label="re-enter password"
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
                    Register
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
Register.propTypes = {
  error: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  error: state.error,
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, { register })(Register);
