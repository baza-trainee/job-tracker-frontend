// import { Navigate, Route, Routes } from "react-router-dom";
// import MainLayout from "./layouts/MainLayout";
// import Opportunities from "./components/Opportunities/Opportunities";
// import Matches from "./components/Matches/Matches";
// import Home from "./pages/Home";
// import Search from "./components/Search/Search";
// import AuthorizationLayout from "./pages/auth/AuthorizationLayout";

// import { PublicRoute } from "./components/PublicRoute/PublicRoute";
// import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";

// function App() {
//   return (
//     <Routes>
//       <Route
//         path="/home/*"
//         element={
//           <PrivateRoute>
//             <MainLayout />
//           </PrivateRoute>
//         }
//       >
//         <Route index element={<Home />} />
//         <Route path="opportunities" element={<Opportunities />} />
//         <Route path="matches" element={<Matches />} />
//         <Route path="search" element={<Search />} />
//       </Route>

//       <Route
//         path="/sign-up"
//         element={
//           <PublicRoute>
//             <AuthorizationLayout type="signUp" />
//           </PublicRoute>
//         }
//       />
//       <Route
//         path="/log-in"
//         element={
//           <PublicRoute>
//             <AuthorizationLayout type="logIn" />
//           </PublicRoute>
//         }
//       />
//       <Route
//         path="/"
//         element={
//           <PublicRoute>
//             <AuthorizationLayout type="signUp" />
//           </PublicRoute>
//         }
//       />
//       <Route path="*" element={<Navigate to="/" />} />
//     </Routes>
//   );
// }

// export default App;

//--------------------------------------------------------------------------------

import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Vacancies from "./components/Vacancies/Vacancies";
import Statistics from "./components/Statistics/Statistics";
import Home from "./pages/Home";
import Profile from "./components/Profile/Profile";
import Notes from "./components/Notes/Notes";
import { SignUp } from "./pages/SignUp/SignUp";
import { LogIn } from "./pages/LogIn/LogIn";
import { useAppSelector } from "./store/hook";
import { selectTheme } from "./store/slices/themeSlice/themeSelector";
import { useEffect } from "react";

function App() {
  const darkMode = useAppSelector(selectTheme);
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="vacancies" element={<Vacancies />} />
        <Route path="statistics" element={<Statistics />} />
        <Route path="profile" element={<Profile />} />
        <Route path="notes" element={<Notes />} />
      </Route>

      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/log-in" element={<LogIn />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
