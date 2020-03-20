import { GET_EVENTS } from "../actions/types";

const initialState = {
  events: []
};

const eventsReducer = (state = initialState, action) => {
  switch (action.type) {
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
