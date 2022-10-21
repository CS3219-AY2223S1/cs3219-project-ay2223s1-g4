import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import Loading from "./components/loading";

import DifficultySelector from "./pages/DifficultySelector";
import LoginPage from "./pages/LoginPage";
import DashBoard from "./pages/DashBoard";
import ProfilePage from "./pages/ProfilePage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import RequireAuth from "./routers/RequireAuth";
import { Navigate } from "react-router-dom";
import { Box } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import RoomPage from "./pages/RoomPage";
import LoadingPage from "./pages/LoadingPage";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const { isLoading, error } = useAuth0();
  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="App">
      <Box margin={"1rem"}>
        <NavBar />
      </Box>
      <Box display={"flex"} flexDirection={"column"} padding={"4rem"}>
        <Router>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/selectdifficulty"
              element={
                <RequireAuth>
                  <DifficultySelector />
                </RequireAuth>
              }
            />
            <Route
              path="/dashboard"
              element={
                <RequireAuth>
                  <DashBoard />
                </RequireAuth>
              }
            />
            <Route
              path="/ProfilePage"
              element={
                <RequireAuth>
                  <ProfilePage />
                </RequireAuth>
              }
            />
            <Route
              path="/ChangePasswordPage"
              element={
                <RequireAuth>
                  <ChangePasswordPage />
                </RequireAuth>
              }
            />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/room/:collabId"
              element={
                <RequireAuth>
                  <RoomPage />
                </RequireAuth>
              }
            />

            <Route
              path="/loading/:loadingId"
              element={
                <RequireAuth>
                  <LoadingPage />
                </RequireAuth>
              }
            />
            <Route path="*" element={<Navigate to={{ pathname: "/" }} />} />
          </Routes>
        </Router>
      </Box>
    </div>
  );
}

export default App;
