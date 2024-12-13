import axios from "axios";
import { AXIOS } from "./axios-constants";
// import { useAppSelector } from "../store/hook";

export const api = axios.create({
  baseURL: AXIOS.URL_BACKEND,
  headers: {
    "Content-Type": "application/json",
  },
});

// axiosInstance - START
export const axiosInstance = axios.create({
  baseURL: AXIOS.URL_BACKEND,
  headers: {
    "Content-Type": "application/json",
  },
});

const parseAccessToken = (): string | null => {
  const persistAuth = localStorage.getItem("persist:auth");
  if (!persistAuth) return null;

  try {
    const authData = JSON.parse(persistAuth);
    const tokens = authData.tokens ? JSON.parse(authData.tokens) : null;
    return tokens?.access_token || null;
  } catch {
    return null;
  }
};

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = parseAccessToken();

    // TODO для використання треба зробити розширення tsx, бо хуки можна викликати лише в функціональних компонентах
    // const { tokens } = useAppSelector((state) => state.auth);
    // const accessToken = tokens?.access_token;

    if (accessToken) {
      config.headers["Authorization"] = `${AXIOS.BEARER} ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// axiosInstance - END

// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (error.response.status == 401) {
//       const refreshToken = localStorage.getItem(AXIOS.ACCESS_TOKEN);
//       try {
//         const { data } = await api.post("/user/profile", {
//           refreshToken,
//         });
//         const dispatch = useAppDispatch();
//         dispatch(
//           saveTokens({
//             access_token: data.access_token,
//             refresh_token:data.access_token
//           })
//         );
//         localStorage.setItem(AXIOS.REFRESH_TOKEN, data.refreshToken);
//         localStorage.setItem(AXIOS.ACCESS_TOKEN, data.accessToken);
//         return api(error.config);
//       } catch (refreshError) {
//         return Promise.reject(refreshError);
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// axiosInstance.interceptors.request.use(
//   (config) => {
//     const accessToken = localStorage.getItem(AXIOS.ACCESS_TOKEN);
//     if (accessToken) {
//       config.headers.common["Authorization"] = `${AXIOS.BEARER} ${accessToken}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// const setToken = (token: string) => {
//   if (token) {
//     return (axiosInstance.defaults.headers.common['Authorization'] =
//       `${AXIOS.BEARER} ${token}`)
//   } else {
//     axiosInstance.defaults.headers.common['Authorization'] = ''
//   }
// }

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (error.response.status == 401) {
//       const refreshToken = localStorage.getItem(AXIOS.ACCESS_TOKEN);
//       try {
//         const { data } = await axiosInstance.post("/user/profile", {
//           refreshToken,
//         });
//         setToken(data.accessToken);
//         localStorage.setItem(AXIOS.REFRESH_TOKEN, data.refreshToken);
//         localStorage.setItem(AXIOS.ACCESS_TOKEN, data.accessToken);
//         return axiosInstance(error.config);
//       } catch (refreshError) {
//         return Promise.reject(refreshError);
//       }
//     }
//     return Promise.reject(error);
//   },
// );
