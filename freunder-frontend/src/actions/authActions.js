import axios from "axios";

// Login User
export const login = () => dispatch => {
  const body = { email: "jan@gmail.com", password: "password" };
  axios
    .post("https://freunder.uber.space/login", body)
    .then(response => {
      console.log(response);
    })
    .catch(response => {
      console.log(response);
    });
};
