import axios from "axios";
const baseUrl = import.meta.env.VITE_SERVER_API;

export const axiosInstance = axios.create({
  baseURL: baseUrl,
});
