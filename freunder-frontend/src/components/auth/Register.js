import React, { Component } from "react";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { register, update, resetResponseMsg } from "../../actions/authActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Alert from "@material-ui/lab/Alert";

export class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: props.user ? props.user.email : "",
      name: props.user ? props.user.name : "",
      password: "",
      password2: "",
      msg: [],
      user: JSON.parse(localStorage.getItem("user")),
      isSettings:
        props.location.state !== undefined && props.location.state.settings
    };
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = () => {
    const { email, name, password, password2, user } = this.state;
    const userData = { email, name, password, password2 };
    if (this.state.isSettings) {
      const userId = user._id;
      this.props.update({ ...userData, userId });
    } else {
      this.props.register({ ...userData });
    }
  };
  componentDidMount() {
    this.props.resetResponseMsg();
  }
  componentDidUpdate(prevProps) {
    const { error } = this.props;
    const { responseMsg } = this.props;
    if (error !== prevProps.error) {
      if (error.id === "REGISTER_FAIL" || error.id === "UPDATE_FAIL") {
        let errors = [];
        error.msg.messages.forEach(el => {
          errors.push(el.msg);
        });
        this.setState({ msg: errors });
      } else {
        this.setState({ msg: [] });
      }
    }
    if (responseMsg !== prevProps.responseMsg) {
      if (
        responseMsg === "UPDATE_SUCCESS" ||
        responseMsg === "REGISTER_SUCCESS"
      ) {
        this.props.history.push("/");
      }
    }
  }
  render() {
    return (
      <div>
        <Grid container justify="center" alignItems="center">
          <Grid item md={6} xs={10}>
            <h2>
              {this.props.location.state && this.props.location.state.settings
                ? "Update your profile:"
                : "Create your profile:"}
            </h2>
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
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                  <br />
                  <TextField
                    margin="normal"
                    name="name"
                    label="name"
                    value={this.state.name}
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
                    {this.state.isSettings ? "Update" : "Register"}
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
  register: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
  resetResponseMsg: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  error: state.error,
  isAuthenticated: state.auth.isAuthenticated,
  requestMsg: state.auth.requestMsg,
  user: state.auth.user,
  responseMsg: state.auth.responseMsg
});
export default connect(mapStateToProps, { register, update, resetResponseMsg })(
  Register
);
