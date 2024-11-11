import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Opportunities from "./components/Opportunities/Opportunities";
import Matches from "./components/Matches/Matches";
import Home from "./pages/Home";
import Search from "./components/Search/Search";
import SignInCard from "./pages/Auth/AuthorizationLayout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="opportunities" element={<Opportunities />} />
        <Route path="matches" element={<Matches />} />
        <Route path="search" element={<Search />} />
        <Route path="/sign-up" element={<SignInCard type="signUp" />} />
        <Route path="/log-in" element={<SignInCard type="logIn" />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
