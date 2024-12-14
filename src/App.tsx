import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Vacancies from "./components/Vacancies/Vacancies";
import Statistics from "./components/Statistics/Statistics";
import Home from "./pages/Home";
import Profile from "./components/Profile/Profile";
import Notes from "./components/Notes/Notes";
import { SignUp } from "./pages/SignUp";
import { LogIn } from "./pages/LogIn";
import { ResetPassword } from "./pages/ResetPassword";
import { AuthCallback } from "./pages/AuthCallback";
import { useAppSelector } from "./store/hook";
import { selectTheme } from "./store/slices/themeSlice/themeSelector";
import { useEffect } from "react";

import { PublicRoute } from "./components/PublicRoute/PublicRoute";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";
import { useAppDispatch } from "./store/hook";
import { refreshUser } from "./store/slices/authSlice/authOperation";
import { axiosInstance } from "./api/axios";

function App() {
  const darkMode = useAppSelector(selectTheme);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(refreshUser());
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode, dispatch]);

  // TODO: перевірка axiosInstance потім видалити
  const func = async () => {
    try {
      const response = await axiosInstance.get("/vacancies");
      return response
    } catch (error) {
      console.log("errorGet", error)
    }
  };
  func().then((rezult) => console.log("axiosInstance", rezult));
  // ----------------------------------------------------------------

  return (
    <Routes>
      <Route element={<PrivateRoute routeTo="/log-in" />}>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="vacancies" element={<Vacancies />} />
          <Route path="vacancies" element={<Vacancies />} />
          <Route path="statistics" element={<Statistics />} />
          <Route path="profile" element={<Profile />} />
          <Route path="notes" element={<Notes />} />
          <Route path="*" element={<h1>Page not found</h1>} />
        </Route>
      </Route>

      <Route element={<PublicRoute routeTo="/" />}>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/log-in" element={<LogIn />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="*" element={<h1>Page not found</h1>} />
      </Route>
    </Routes>
  );
}

export default App;
