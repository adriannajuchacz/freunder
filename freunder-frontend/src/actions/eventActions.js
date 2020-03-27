import { GET_EVENTS } from "./types";
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
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
