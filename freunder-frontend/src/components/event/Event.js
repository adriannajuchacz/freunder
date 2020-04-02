import React, { Component } from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import LanguageIcon from "@material-ui/icons/Language";
import ScheduleIcon from "@material-ui/icons/Schedule";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

class Event extends Component {
  dateToString(date) {
    let d = new Date(date);
    let h = d.getHours();
    let m = d.getMinutes();
    let str = d.toLocaleDateString("de-DE") + " " + h + ":" + m;
    return str;
  }
  render() {
    return (
      <div>
        <Box borderColor="primary.main" borderRadius={16} p={4} border={1}>
          <Grid container spacing={2}>
            <Grid item sm={4} xs={12}>
              <Box overflow="hidden">
                <img
                  style={{ width: "100%" }}
                  alt="complex"
                  src={this.props.event.imgLink}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm container>
              <Grid container direction="column" spacing={2}>
                <Grid item xs>
                  <Box textAlign="left">
                    <Typography component={"span"} color="primary">
                      <Grid container direction="row" justify="space-between">
                        <Grid item>
                          <Grid container alignItems="center">
                            <LocationOnIcon></LocationOnIcon>
                            <p>{this.props.event.location}</p>
                            <br />
                            <LanguageIcon></LanguageIcon>
                            <a
                              href={this.props.event.link}
                              style={{ textDecoration: "none" }}
                            >
                              <p>website</p>
                            </a>
                          </Grid>
                        </Grid>
                        <Grid item>
                          <Grid container alignItems="center">
                            <ScheduleIcon></ScheduleIcon>
                            <p>
                              {this.dateToString(this.props.event.start)} -{" "}
                              {this.dateToString(this.props.event.end)}
                            </p>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Typography>
                    <h3 style={{ textTransform: "uppercase", margin: "0" }}>
                      {this.props.event.title}
                    </h3>
                    <p>{this.props.event.description}</p>
                  </Box>
                </Grid>
                <Grid item>
                  <Grid container justify="flex-end">
                    <Link to="/newEvent" style={{ textDecoration: "none", marginRight: "7px" }}>
                      <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        margin="normal"
                      >
                        change event
                      </Button>
                    </Link>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      margin="normal"
                    >
                      + attend
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </div>
    );
  }
}

export default Event;
