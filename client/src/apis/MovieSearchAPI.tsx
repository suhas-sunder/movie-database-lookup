import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:3100/api/v1/movies",
});
