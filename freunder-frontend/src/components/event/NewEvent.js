import React, { Component } from "react";
import moment from "moment";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { KeyboardDateTimePicker } from "@material-ui/pickers";
import { addEvent, updateEvent, resetResponseMsg } from "../../actions/eventActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Alert from "@material-ui/lab/Alert";

class NewEvent extends Component {
  constructor(props) {
    super(props);
    let updateEvent = props.location.state.event
      ? props.location.state.event
      : null;
    this.state = {
      title: updateEvent ? updateEvent.title : "",
      location: updateEvent ? updateEvent.location : "",
      description: updateEvent ? updateEvent.description : "",
      imgLink: updateEvent ? updateEvent.imgLink : "",
      link: updateEvent ? updateEvent.link : "",
      start: updateEvent ? moment(updateEvent.start) : moment(),
      end: updateEvent ? moment(updateEvent.end) : moment(),
      msg: [],
      user: JSON.parse(localStorage.getItem("user")),
      isUpdate:
        props.location.state !== undefined && props.location.state.update,
      event_id: updateEvent._id
    };
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onStartDateChange = e => {
    this.setState({ start: e });
  };
  onEndDateChange = e => {
    this.setState({ end: e });
  };
  onSubmit = () => {
    let {
      title,
      location,
      description,
      imgLink,
      link,
      start,
      end,
      user
    } = this.state;
    start = start.toDate().toJSON();
    end = end.toDate().toJSON();
    const userData = {
      title,
      location,
      description,
      imgLink,
      link,
      start,
      end
    };
    const user_id = user._id;
    const event_id = this.state.event_id;
    if (this.state.isUpdate) {
      console.log("TRYING TO UPDATE");
      this.props.updateEvent({ ...userData, user_id, event_id });
    } else {
      this.props.addEvent({ ...userData, user_id });
    }
  };
  componentDidMount() {
    this.props.resetResponseMsg();
  }
  componentDidUpdate(prevProps) {
    const { responseMsg } = this.props;
    const { error } = this.props;
    debugger;
    if (responseMsg !== prevProps.responseMsg) {
      if (
        responseMsg === "ADD_EVENT_SUCCESS" ||
        responseMsg === "UPDATE_EVENT_SUCCESS"
      ) {
        this.props.history.push("/");
      }
    }
    if (error !== prevProps.error) {
      if (error.id === "ADD_EVENT_FAIL" || error.id === "UPDATE_EVENT_FAIL") {
        let errors = [];
        error.msg.messages.forEach(el => {
          errors.push(el.msg);
        });
        this.setState({ msg: errors });
      } else {
        this.setState({ msg: [] });
      }
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
                    label="title"
                    name="title"
                    value={this.state.title}
                    onChange={this.onChange}
                  />
                  <br />
                  <TextField
                    margin="normal"
                    label="location"
                    name="location"
                    value={this.state.location}
                    onChange={this.onChange}
                  />
                  <br />
                  <TextField
                    margin="normal"
                    label="description"
                    name="description"
                    multiline
                    rows="3"
                    value={this.state.description}
                    onChange={this.onChange}
                  />
                  <br />
                  <TextField
                    margin="normal"
                    label="paste an url of an image of choice"
                    name="imgLink"
                    value={this.state.imgLink}
                    onChange={this.onChange}
                  />
                  <br />
                  <TextField
                    margin="normal"
                    label="paste a link to the event"
                    name="link"
                    value={this.state.link}
                    onChange={this.onChange}
                  />
                  <br />
                  <KeyboardDateTimePicker
                    value={this.state.start}
                    onChange={this.onStartDateChange}
                    label="start of the event"
                    name="start"
                    variant="dialog"
                    ampm={false}
                    format="YYYY/MM/DD HH:mm"
                  />
                  <br />
                  <KeyboardDateTimePicker
                    value={this.state.end}
                    onChange={this.onEndDateChange}
                    label="end of the event"
                    name="end"
                    variant="dialog"
                    ampm={false}
                    format="YYYY/MM/DD HH:mm"
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
                    {this.state.isUpdate ? "Update" : "Add"}
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

NewEvent.propTypes = {
  error: PropTypes.object.isRequired,
  addEvent: PropTypes.func.isRequired,
  updateEvent: PropTypes.func.isRequired,
  resetResponseMsg: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  error: state.error,
  responseMsg: state.event.responseMsg
});
export default connect(mapStateToProps, { addEvent, updateEvent, resetResponseMsg })(NewEvent);
