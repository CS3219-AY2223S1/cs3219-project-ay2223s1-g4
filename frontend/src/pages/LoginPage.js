import { Box } from "@mui/material";
import LoginButton from "../components/buttons/LoginButton";
import Typography from "@mui/material/Typography";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";
import {Stack} from "@mui/material";
import RegisterButton from '../components/buttons/RegisterButton';

function LoginPage() {

  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <Box display={"flex"} flexDirection={"row"} justifyContent={"flex-end"}>
      <Typography variant="h2">Welcome to PeerPrep!</Typography>
      <Box margin={"1rem"}>
        <Typography variant="h4">About</Typography>
        <Typography margin={"1rem"}>PeerPrep is a ...</Typography>
        <Typography variant="h4">How to use</Typography>
        <Typography margin={"1rem"}>
          Sign up now to try out PeerPrep!
        </Typography>
      </Box>
      <Stack justifyContent="center">
        <LoginButton fullWidth='true' margin="20px"></LoginButton>
        <RegisterButton fullWidth='true' margin="20px"></RegisterButton>
      </Stack>
    </Box>
  );
}

export default LoginPage;
