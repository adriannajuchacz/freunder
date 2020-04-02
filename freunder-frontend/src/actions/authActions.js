import { axiosInstance } from "../axiosInstance";
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  UPDATE_SUCCESS,
  RESET_RESPONSE_MSG
} from "../actions/types";
import store from "../store";
import { returnErrors } from "./errorActions";

// Login User
export const login = ({ email, password }) => dispatch => {

  // Request body
  const body = JSON.stringify({ email, password });
  axiosInstance
    .post("/login", body)
    .then(res => {
      store.dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
      );
      dispatch({
        type: LOGIN_FAIL
      });
    });
};

// Logout User
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};

// Register User
export const register = ({ name, email, password, password2 }) => dispatch => {
  // Request body
  const body = JSON.stringify({ name, email, password, password2 });

  axiosInstance
    .post("/register", body)
    .then(res =>
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
      );
      dispatch({
        type: REGISTER_FAIL
      });
    });
};

// Update User
export const update = ({
  name,
  email,
  password,
  password2,
  userId
}) => dispatch => {
  // Request body
  const body = JSON.stringify({ name, email, password, password2 });

  axiosInstance
    .put("/users/" + userId, body)
    .then(res =>
      dispatch({
        type: UPDATE_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "UPDATE_FAIL")
      );
    });
};

export const resetResponseMsg = () => dispatch => {
  dispatch({
    type: RESET_RESPONSE_MSG
  });
};
