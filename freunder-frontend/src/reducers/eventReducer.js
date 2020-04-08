import {
  GET_EVENTS,
  ADD_EVENT,
  ADD_EVENT_SUCCESS,
  UPDATE_EVENT_SUCCESS,
  RESET_EVENT_RESPONSE_MSG
} from "../actions/types";

const initialState = {
  events: [],
  responseMsg: ""
};

const eventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_EVENT:
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
    case UPDATE_EVENT_SUCCESS:
      return {
        ...state,
        responseMsg: "UPDATE_EVENT_SUCCESS"
      };
    case RESET_EVENT_RESPONSE_MSG:
      return {
        ...state,
        responseMsg: ""
      };
    default:
      return state;
  }
};

export default eventsReducer;
