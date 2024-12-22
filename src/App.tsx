import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Vacancies from "./pages/Vacancies";
import Statistics from "./pages/Statistics";
import Profile from "./pages/Profile";
import Notes from "./pages/Notes";
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

import Archive from "./components/Archive/Archive";

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

  return (
    <Routes>
      <Route element={<PrivateRoute routeTo="/log-in" />}>
        <Route path="/" element={<Navigate to="/vacancies" />} />
        <Route path="/" element={<MainLayout />}>
          <Route path="vacancies" element={<Vacancies />} />
          <Route path="statistics" element={<Statistics />} />
          <Route path="profile" element={<Profile />} />
          <Route path="notes" element={<Notes />} />
          <Route path="archive" element={<Archive />} />
          <Route path="*" element={<Navigate to="/vacancies" />} />
        </Route>
      </Route>

      <Route element={<PublicRoute routeTo="/vacancies" />}>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/log-in" element={<LogIn />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="*" element={<Navigate to="/vacancies" />} />
      </Route>
    </Routes>
  );
}

export default App;
