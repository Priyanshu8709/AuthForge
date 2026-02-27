import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api/v1';

const API = axios.create({
  baseURL: API_BASE,
});

// add token header to each request if present
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("authToken");
  console.debug("api request", req.method, req.url, "token=", token);
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// helpers that mimic the old fetch api
export const apiPost = async (path, payload) => {
  const response = await API.post(path, payload);
  return response.data;
};

export const apiGet = async (path) => {
  const response = await API.get(path);
  return response.data;
};

export { API, API_BASE }
