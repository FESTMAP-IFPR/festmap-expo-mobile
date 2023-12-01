import axios from "axios";

export const api = axios.create({
  baseURL: `http://192.100.40.206:3000`,
});
