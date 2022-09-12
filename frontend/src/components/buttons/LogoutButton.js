import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <Button
      variant={"outlined"}
      sx={{ m: 2 }}
      onClick={() =>
        logout({
          returnTo: window.location.origin,
        })
      }
      margin="20px"
    >
      Log Out
    </Button>
  );
};

export default LogoutButton;
