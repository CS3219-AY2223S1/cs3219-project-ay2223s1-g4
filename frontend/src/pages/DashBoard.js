import { Box } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../components/Loading";

function DashBoard() {
  const { isAuthenticated, isLoading, user } = useAuth0();
    
  if (isLoading) {
    return <Loading/>;
  }

  return (
    isAuthenticated && (
      <Box>
        <h2>Welcome to PeerPrep {user.nickname}!</h2>
        <div>
          Use the buttons on the navigation bar to begin the PeerPrep
          experience!
        </div>
        <div>Start training under the Train tab!</div>
        <div>Change your user details under the Profile tab</div>
      </Box>
    )
  );
}

export default DashBoard;
