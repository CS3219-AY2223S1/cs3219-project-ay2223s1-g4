import { Box } from "@mui/material";
import LogoutButton from "../components/buttons/LogoutButton";
import SelectDifficultyButton from "../components/buttons/SelectDifficultyButton";
import Profile from "../components/user/Profile";
import { useAuth0 } from "@auth0/auth0-react";

function DashBoard() {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <Box display={"flex"} flexDirection={"row"} justifyContent={"flex-end"}>
        <Profile />
        <div>
          <SelectDifficultyButton></SelectDifficultyButton>
        </div>
        <div>
          <LogoutButton></LogoutButton>
        </div>
      </Box>
    )
  );
}

export default DashBoard;
