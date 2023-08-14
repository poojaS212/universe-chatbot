import axios from "axios";

const api = axios.create({
//   baseURL: "http://unibot.propstory.com/"
  baseURL: "http://localhost:9000/"
});

export default api;