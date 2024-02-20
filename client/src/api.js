import axios from "axios";

const Axios = axios.create({
  // baseURL: "https://edutimeserver.onrender.com",
  baseURL: "http://localhost:8800",
  // baseURL: "http://192.168.43.36:8800",
});

export default Axios;