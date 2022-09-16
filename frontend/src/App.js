import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import Loading from "./components/loading";

import DifficultySelector from "./pages/DifficultySelector";
import LoginPage from "./pages/LoginPage";
import DashBoard from "./pages/DashBoard";
import RequireAuth from "./routers/RequireAuth";
import { Box } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import RoomPage from "./pages/RoomPage";
import LoadingPage from "./pages/LoadingPage";

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
            {/*
                    <Route path="/login" element={<Login />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/myaccount" element={<Myaccount />} />
                    <Route path="/profile" element={<Profile />} />
                    */}
            <Route
              path="/dashboard"
              element={
                <RequireAuth>
                  <DashBoard />
                </RequireAuth>
              }
            />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </Router>
      </Box>
    </div>
  );
}

export default App;
