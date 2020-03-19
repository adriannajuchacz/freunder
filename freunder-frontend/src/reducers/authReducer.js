import { LOGIN_SUCCESS } from "../actions/types";

const authReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
    default:
      return state;
  }
};

export default authReducer;
