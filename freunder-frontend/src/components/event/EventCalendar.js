import React, { Component } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import events from "../../events";
import moment from "moment";
import Grid from "@material-ui/core/Grid";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);
export default class EventCalendar extends Component {
  render() {
    return (
      <Grid container justify="center" alignItems="center">
        <Grid item md={8} xs={10}>
          <div style={{ height: "80vh" }}>
            <Calendar
              culture="en-GB"
              events={events}
              views={["month"]}
              defaultDate={new Date(2018, 3, 1)}
              localizer={localizer}
            />
          </div>
        </Grid>
      </Grid>
    );
  }
}
