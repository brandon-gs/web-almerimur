import _axios from "axios";

const axios = _axios.create({
  baseURL: process.env.REACT_APP_BACKEND,
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
});

export default axios;
