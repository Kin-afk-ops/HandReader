// src/api/axiosInstance.ts
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:9999", // 👈 Đổi IP này nếu dùng trên thiết bị thật
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
