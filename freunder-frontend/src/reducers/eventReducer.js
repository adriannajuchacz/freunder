import {
  GET_EVENTS,
  ADD_EVENT,
  ADD_EVENT_SUCCESS,
  ADD_EVENT_FAIL
} from "../actions/types";

const initialState = {
  events: [],
  responseMsg: ""
};

const eventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_EVENT:
    case ADD_EVENT_FAIL:
    case GET_EVENTS:
      return {
        ...state,
        events: action.payload.events
      };
    case ADD_EVENT_SUCCESS:
      return {
        ...state,
        responseMsg: "ADD_EVENT_SUCCESS"
      };
    default:
      return state;
  }
};

export default eventsReducer;
