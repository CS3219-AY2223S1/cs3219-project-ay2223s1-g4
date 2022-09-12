import { Box } from "@mui/material";
import LoginButton from "../components/buttons/LoginButton";
import Typography from "@mui/material/Typography";

function LoginPage() {
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
      <LoginButton margin="20px"></LoginButton>
    </Box>
  );
}

export default LoginPage;
