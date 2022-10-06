import { Box, Stack } from "@mui/material";
import Profile from "../components/user/Profile";
import { useAuth0 } from "@auth0/auth0-react";
import UpdateDetailsForm from "../components/form/UpdateDetailsForm";
import DeleteAccount from "../components/buttons/DeleteUserButton";

function ProfilePage() {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <Stack>
        <Box>
          <Profile />
        </Box>
        <Box>
            <DeleteAccount/>
        </Box>
      </Stack>
    )
  );
}

export default ProfilePage;
