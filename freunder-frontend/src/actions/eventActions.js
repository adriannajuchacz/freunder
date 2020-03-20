import { GET_EVENTS } from "./types";
import store from "../store";
import { axiosInstance } from '../axiosInstance';

// Login User
export const getEvents = () => dispatch => {
  // Headers
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: "Bearer " + token
    }
  };
  axiosInstance
    .get("events")
    .then(res => {
      store.dispatch({
        type: GET_EVENTS,
        payload: res.data
      });
    })
    .catch(
      err => {}
      /* ispatch(
        returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
      );  
      store.dispatch({
        type: LOGIN_FAIL
      })*/
    );
};
