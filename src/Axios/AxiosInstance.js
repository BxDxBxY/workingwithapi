import axios from "axios";
import GetCookie from "../Cookies/GetCookie";
import SetCookie from "../Cookies/SetCookie";

const URL = "http://localhost:5000/api";

const AxiosInstance = axios.create({
  baseURL: URL,
});

AxiosInstance.interceptors.request.use(
  (config) => {
    const token = GetCookie("access_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

AxiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = GetCookie("refresh_token");
      try {
        const { data } = await axios.post("/auth/refresh-token", {
          refreshToken,
        });
        const newToken = data.access_token;

        SetCookie("access_token", newToken, 2);
        localStorage.setItem("access_token", newToken);

        axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
        return AxiosInstance(originalRequest);
      } catch (refreshError) {
        console.log("Refresh token failed. Logging out...");
        window.location.href = "/auth/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default AxiosInstance;
