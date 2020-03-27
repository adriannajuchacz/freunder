import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://freunder.uber.space/",
  timeout: 1000
});


axiosInstance.interceptors.request.use(
  async function(config) {
    await setTimeout(() => {
    }, 1000);
    const token = localStorage.getItem("token");
    config.headers = { ...config.headers, Authorization: "Bearer " + token };
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);
