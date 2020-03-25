import React, { Component } from "react";
import Event from "./Event";
import { getEvents } from "../../actions/eventActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class EventList extends Component {
  componentDidMount() {
    this.props.getEvents();
  }
  render() {
    const { events } = this.props.event;
    const propEvents = events.map(event => <Event event={event} />);
    return (
      <div>
        <h1>EVENTLIST.JS</h1>
        {propEvents}
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
