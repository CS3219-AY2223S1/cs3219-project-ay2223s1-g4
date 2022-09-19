import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";

const RegisterButton = ({margin, fullWidth}) => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button
      variant={"outlined"}
      sx={{ m: 2 }}
      onClick={() => loginWithRedirect({screen_hint:'signup'})}
      margin="20px"
      fullWidth={Boolean(fullWidth)}
    >
      Signup
    </Button>
  );
};

export default RegisterButton;
