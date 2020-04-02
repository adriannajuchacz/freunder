import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://freunder.uber.space/",
  //baseURL: "http://localhost:7878/",
  timeout: 1000
});


axiosInstance.interceptors.request.use(
  async function(config) {
    await setTimeout(() => {
    }, 1000);
    const token = localStorage.getItem("token");
    config.headers = { ...config.headers, Authorization: "Bearer " + token, "Content-Type": "application/json" };
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);
