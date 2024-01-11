import axios from "axios";
import { getAuthToken } from "./authToken";

const API_URL = "https://example.com/api/";

axios.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

const waillApi = axios.create({
  baseURL: API_URL,
});

export default waillApi;

// TODO: How to use this ?

// TODO: Does the file holding the state of authToken work?
