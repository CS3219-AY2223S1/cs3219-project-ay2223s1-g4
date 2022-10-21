import { Box } from "@mui/material";
import LoginButton from "../components/buttons/LoginButton";
import Typography from "@mui/material/Typography";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";
import { Stack } from "@mui/material";
import RegisterButton from "../components/buttons/RegisterButton";

function LoginPage() {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <Box
      display={"flex"}
      flexDirection={"row"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Box margin={"1rem"}>
        <Typography variant="h2">
          Welcome to Software Interview Xchange (SIX)!
        </Typography>
        <Typography variant="h4">What is SIX?</Typography>
        <Typography margin={"1rem"}>
          SIX is a solution for geeks to improve their algorithmic skills with
          online peer coding sessions!
        </Typography>
        <Typography variant="h4">How to use SIX?</Typography>
        <Typography margin={"1rem"}>
          SIX matches geeks in a 1 to 1 setting to complete a series of coding
          questions.
        </Typography>
        <Typography variant="h4">Why use SIX?</Typography>
        <Typography margin={"1rem"}>
          SIX simulates live technical interviews and also allows you to improve
          your coding skills and hopefully to break through the OA rounds!
        </Typography>
        <Typography variant="h4">Sign up now to try out SIX!</Typography>

        <Stack justifyContent="center">
          <LoginButton fullWidth="true" margin="20px"></LoginButton>
          <RegisterButton fullWidth="true" margin="20px"></RegisterButton>
        </Stack>
      </Box>
    </Box>
  );
}

export default LoginPage;
