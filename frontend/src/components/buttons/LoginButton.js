import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";
const LoginButton = ({ margin, fullWidth }) => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button
      variant={"outlined"}
      style={{ backgroundColor: "#FFFFFF", borderColor:"#000", color:"#000" }}
      sx={{ m: 2 }}
      onClick={() => loginWithRedirect()}
      margin={margin}
      fullWidth={Boolean(fullWidth)}
    >
      Log In
    </Button>
  );
};

export default LoginButton;
