// src/api/axiosInstance.ts
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://192.168.1.254:9999", // 👈 Đổi IP này nếu dùng trên thiết bị thật
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
