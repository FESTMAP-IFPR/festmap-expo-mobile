import axios from "axios";

export const api = axios.create({
  baseURL: `http://192.100.43.113:3000`,
});
