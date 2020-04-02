import { GET_EVENTS, LOGOUT_SUCCESS, ADD_EVENT_SUCCESS, ADD_EVENT_FAIL } from "./types";
import store from "../store";
import { axiosInstance } from "../axiosInstance";
import { returnErrors } from "./errorActions";

export const getEvents = () => dispatch => {
  axiosInstance
    .get("events")
    .then(res => {
      store.dispatch({
        type: GET_EVENTS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: LOGOUT_SUCCESS
      });
    });
};

export const addEvent = ({ title, location, description, imgLink, link, start, end, user_id }) => dispatch => {
    // Request body
  const body = JSON.stringify({ title, location, description, imgLink, link, start, end, user_id });
  debugger
    axiosInstance
    .post("/events", body)
    .then(res =>
      dispatch({
        type: ADD_EVENT_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
      );
      dispatch({
        type: ADD_EVENT_FAIL
      });
    });
}