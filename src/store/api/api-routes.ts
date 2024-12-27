export const BACKEND_ENDPOINTS = {
  JOB_TRACKER_BACKEND: "https://job-tracker-backend-x.vercel.app/api",
};

type ApiRouts = {
  USER: { PROFILE: string; CHANGE_PASSWORD: string };
  AUTH: {
    REGISTER: string;
    LOGIN: string;
    LOGOUT: string;
    REFRESH: string;
    FORGOT_PASSWORD: string;
    RESET_PASSWORD: string;
  };
};

export const API_ROUTES: ApiRouts = {
  USER: { PROFILE: "/user/profile", CHANGE_PASSWORD: "/user/change-password" },
  AUTH: {
    REGISTER: "/auth/register",
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    REFRESH: "/auth/refresh",
    RESET_PASSWORD: "/auth/refresh-password",
    FORGOT_PASSWORD: "/auth/forgot-password",
  },
};
