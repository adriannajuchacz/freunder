import { axiosInstance } from '../axiosInstance';
import { LOGIN_SUCCESS, LOGIN_FAIL } from "../actions/types";
import store from "../store";
import { returnErrors } from "./errorActions";

// Login User
export const login = ({ email, password }) => dispatch => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request body
  const body = JSON.stringify({ email, password });
  axiosInstance
    .post("/login", body, config)
    .then(res =>{
      store.dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      })
    }
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL')
      );
      dispatch({
        type: LOGIN_FAIL
      });
    });
};
