import {
  GET_EVENTS,
  ADD_EVENT,
  ADD_EVENT_SUCCESS,
  ADD_EVENT_FAIL
} from "../actions/types";

const initialState = {
  events: []
};

const eventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_EVENT:
    case ADD_EVENT_SUCCESS:
    case ADD_EVENT_FAIL:
    case GET_EVENTS:
      return {
        ...state,
        events: action.payload.events
      };
    default:
      return state;
  }
};

export default eventsReducer;
