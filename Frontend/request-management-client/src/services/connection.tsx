// src/infrastructure/api/axiosInstance.ts
import axios from "axios";

const createAxiosInstance = () => {
  return axios.create({
    baseURL:
      process.env.NODE_ENV === "development" ? process.env.NEXT_PUBLIC_URL : "",
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const axiosInstance = createAxiosInstance();
axiosInstance.interceptors.request.use((request) => {
  request.headers.set(
    "Authorization",
    "bearer " + sessionStorage.getItem("token") || null
  );
  return request;
});
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
