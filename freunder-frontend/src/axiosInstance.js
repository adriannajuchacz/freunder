import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://freunder.uber.space/",
  timeout: 1000
});

const token = localStorage.getItem("token");
axiosInstance.interceptors.request.use(
  function(config) {
    config.headers = { ...config.headers, Authorization: "Bearer " + token };
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);
