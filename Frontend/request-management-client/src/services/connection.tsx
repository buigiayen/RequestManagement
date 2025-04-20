// src/infrastructure/api/axiosInstance.ts
import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL || "https://localhost:7041";

class AxiosService {
  private static instance: AxiosInstance;

  private static createInstance(): AxiosInstance {
    return axios.create({
      baseURL: API_BASE_URL,
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 10000, // Timeout 10s
    });
  }

  public static getInstance(): AxiosInstance {
    if (!this.instance) {
      this.instance = this.createInstance();
      this.setupInterceptors();
    }
    return this.instance;
  }

  private static setupInterceptors(): void {
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );

    this.instance.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config;

        if (error.response?.status === 401) {
          // Handle unauthorized access
          sessionStorage.removeItem("token");
          if (
            typeof window !== "undefined" &&
            !window.location.pathname.includes("/login")
          ) {
            window.location.href = "/login";
          }
        }

        if (error.response?.status === 403) {
          // Handle forbidden access
          console.error("Access forbidden");
        }

        return Promise.reject(error);
      }
    );
  }
}

export default AxiosService.getInstance();
