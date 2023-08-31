import axios from "axios";

// Global Axios Defaults
export default axios.create({
  baseURL: "http://localhost:3100/api/v1/datamuse",
});
