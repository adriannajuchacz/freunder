import { axios } from "axios";
import { LOGIN_SUCCESS } from "./types";

// Login User
export const login = () => dispatch => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "jan@gmail.com", password: "password" })
    };
    fetch("https://freunder.uber.space/login", requestOptions)
      .then(response => response.json())
      .then(data => this.setState({ postId: data.id }));
  };

