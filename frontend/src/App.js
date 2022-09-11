import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import SignupPage from './pages/SignupPage';
import Home from './pages/Home';
import NavBar from './components/NavBar';
import DifficultySelector from './pages/DifficultySelector';
import {Box} from "@mui/material";

function App() {
    return (
        <div className="App">
            <Box margin={"1rem"}>
                <NavBar/>
            </Box>
            <Box display={"flex"} flexDirection={"column"} padding={"4rem"}>
                <Router>
                    <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/selectdifficulty" element={<DifficultySelector />} />
                    {
                    /*
                    <Route path="/login" element={<Login />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/myaccount" element={<Myaccount />} />
                    <Route path="/profile" element={<Profile />} />
                    */
                    }
                    <Route path="/register" element={<SignupPage />} />
                    </Routes>
                </Router>
            </Box>
        </div>
    );
}

export default App;
