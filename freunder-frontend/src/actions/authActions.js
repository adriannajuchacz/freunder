import { axiosInstance } from '../axiosInstance';
import { LOGIN_SUCCESS, LOGIN_FAIL } from "../actions/types";
import store from "../store";

// Login User
export const login = () => dispatch => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request body
  //TODO
  //const body = JSON.stringify({ email, password });
  const body = { email: "jan@gmail.com", password: "password" };
  axiosInstance
    .post("/login", body, config)
    .then(res =>{
      store.dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      })
    }
    )
    .catch(err =>
      /* ispatch(
        returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
      );  */
      store.dispatch({
        type: LOGIN_FAIL
      })
    );
};
