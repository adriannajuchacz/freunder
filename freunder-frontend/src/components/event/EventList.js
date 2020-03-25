import React, { Component } from "react";
import Event from "./Event";
import { getEvents } from "../../actions/eventActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

class EventList extends Component {
  componentDidMount() {
    this.props.getEvents();
  }
  render() {
    const { events } = this.props.event;
    const propEvents = events.map(event => (
      <Grid item xs={12}>
        <Grid container justify="center">
          <Grid item md={8} xs={10}>
            <Event event={event} />
          </Grid>
        </Grid>
      </Grid>
    ));
    return (
      <div>
        <h1>EVENTLIST.JS</h1>

        <Grid container direction="column" justify="center" spacing={3}>
          <Grid item xs={12}>
            <Grid container justify="center">
              <Grid item md={8} xs={10}>
                <Button fullWidth size="large" variant="outlined" color="primary">
                  + add new Event
                </Button>
              </Grid>
            </Grid>
          </Grid>
          {propEvents}
        </Grid>
      </div>
    );
  }
}

EventList.propTypes = {
  getEvents: PropTypes.func.isRequired,
  event: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  event: state.event
});

export default connect(mapStateToProps, { getEvents })(EventList);
