import axios from "axios";

// Create an axios instance
const api = axios.create({
  baseURL: "https://job-tracker-backend-x.vercel.app/api", // Replace with your API's base URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
