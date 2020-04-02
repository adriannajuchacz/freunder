import React, { Component } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import Grid from "@material-ui/core/Grid";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const localizer = momentLocalizer(moment);
class EventCalendar extends Component {
  formatEventDates(events) {
    events.forEach(event => {
      event.start = new Date(event.start);
      event.end = new Date(event.end);
    });
    return events;
  }
  render() {
    let events = this.formatEventDates(this.props.event.events);
    return (
      <Grid container justify="center" alignItems="center">
        <Grid item md={8} xs={10}>
          <div style={{ height: "80vh" }}>
            <Calendar
              culture="en-GB"
              events={events}
              views={["month"]}
              defaultDate={new Date()}
              localizer={localizer}
            />
          </div>
        </Grid>
      </Grid>
    );
  }
}
EventCalendar.propTypes = {
  event: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  event: state.event
});

export default connect(mapStateToProps, {})(EventCalendar);
