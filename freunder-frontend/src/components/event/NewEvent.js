import React, { Component } from "react";
import moment from "moment";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { KeyboardDateTimePicker } from "@material-ui/pickers";

class NewEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      location: "",
      description: "",
      imgLink: "",
      link: "",
      start: moment(),
      end: moment(),
      msg: []
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
  render() {
    return (
      <div>
        <Grid container justify="center" alignItems="center">
          <Grid item md={6} xs={10}>
            <Box borderColor="primary.main" borderRadius={16} p={4} border={1}>
              <form>
                <FormControl fullWidth>
                  <TextField margin="normal" label="title" name="title" />
                  <br />
                  <TextField margin="normal" label="location" name="location" />
                  <br />
                  <TextField
                    margin="normal"
                    label="location"
                    name="location"
                    multiline
                    rows="3"
                  />
                  <br />
                  <TextField
                    margin="normal"
                    label="paste an url of an image of choice"
                    name="imgLink"
                  />
                  <br />
                  <TextField
                    margin="normal"
                    label="paste a link to the event"
                    name="link"
                  />
                  <br />
                  <KeyboardDateTimePicker
                    value={this.state.start}
                    onChange={this.onStartDateChange}
                    label="start of the event"
                    name="start"
                    variant="dialog"
                    ampm={false}
                    onError={console.log}
                    disablePast
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
                    onError={console.log}
                    disablePast
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
                    onClick={console.log("NEW EVENT CLICKED")}
                  >
                    Add
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

export default NewEvent;
