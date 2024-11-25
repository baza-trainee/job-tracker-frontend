import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Vacancies from "./components/Vacancies/Vacancies";
import Statistics from "./components/Statistics/Statistics";
import Home from "./pages/Home";
import Profile from "./components/Profile/Profile";
import Notes from "./components/Notes/Notes";
import { SignUp } from "./pages/SignUp/SignUp";
import { LogIn } from "./pages/LogIn/LogIn";

import { PublicRoute } from "./components/PublicRoute/PublicRoute";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";

function App() {
  return (
    <Routes>
      <Route element={<PrivateRoute routeTo="/sign-up" />}>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
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
        <Route path="*" element={<h1>Page not found</h1>} />
      </Route>
    </Routes>
  );
}

export default App;
