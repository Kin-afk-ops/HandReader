// src/api/axiosInstance.ts
import axios from "axios";
import { SERVER_DOMAIN } from "@env";

const axiosInstance = axios.create({
  baseURL: SERVER_DOMAIN, // 👈 Đổi IP này nếu dùng trên thiết bị thật
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
