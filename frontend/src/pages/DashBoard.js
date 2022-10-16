import { Box } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";

function DashBoard() {
  const { isAuthenticated, isLoading, user } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  console.log(user);
  return (
    isAuthenticated && (
      <Box>
        <h2>Welcome to peer prep {user.name}!</h2>
        <div>
          Use the buttons on the navigation bar to begin the peer prep
          experience!
        </div>
        <div>Instructions here...</div>
      </Box>
    )
  );
}

export default DashBoard;
