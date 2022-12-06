import axios from "axios";
import { notification } from "antd";
import { STORAGE_KEY_CONSTANT } from "./constants";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_HOST,
  // baseURL: `https://survey-vb10x.herokuapp.com/api`,
  headers: {
    "x-access-token": localStorage.getItem(STORAGE_KEY_CONSTANT) || "",
  },
  timeout: 30 * 1000,
});

instance.interceptors.response.use(
  (response) => {
    // if(response.data.status === "success") notification.success({ message: response.data?.message })
    return response;
  },
  (error) => {
    if (error.response.status >= 400 && error.response.status <= 503) {
      notification.error({
        message: error.response.data?.message || error.response?.statusText,
      });
    }
    return Promise.reject(error);
  }
);

export default instance;
