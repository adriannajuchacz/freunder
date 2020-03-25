import React, { Component } from "react";
import Event from "./Event";
import { getEvents } from "../../actions/eventActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";

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
        <Grid
          container
          direction="column"
          justify="center"
          spacing={3}
        >
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
