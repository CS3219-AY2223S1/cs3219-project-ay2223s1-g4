import { Box, Stack } from "@mui/material";
import LogoutButton from "../components/buttons/LogoutButton";
import SelectDifficultyButton from "../components/buttons/SelectDifficultyButton";
import Profile from "../components/user/Profile";
import { useAuth0 } from "@auth0/auth0-react";
import UpdateDetailsForm from "../components/form/UpdateDetailsForm";
import DeleteAccount from "../components/buttons/DeleteUserButton";

function DashBoard() {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <Stack>
        <Box display={"flex"} flexDirection={"row"} justifyContent={"flex-end"}>
          <Profile />
          <div>
            <SelectDifficultyButton></SelectDifficultyButton>
          </div>
          <div>
            <LogoutButton></LogoutButton>
          </div>
        </Box>
        <Box>
          <UpdateDetailsForm />
          <div>
            <DeleteAccount/>
          </div>
        </Box>
      </Stack>
    )
  );
}

export default DashBoard;
