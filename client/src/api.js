import axios from "axios";

const Axios = axios.create({
 // baseURL: "https://edutimeserver.onrender.com",
  // baseURL: "http://localhost:8800",
  baseURL: "https://api.edutime.click",
});

export default Axios;
