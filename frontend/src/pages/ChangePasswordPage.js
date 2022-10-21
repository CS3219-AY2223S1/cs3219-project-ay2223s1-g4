import { Box, Stack } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import React, { useState } from "react";
import ChangePasswordButton from "../components/buttons/ChangePasswordButton";
import Loading from "../components/Loading";

function ChangePasswordPage() {
  const { isAuthenticated, isLoading } = useAuth0();
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
    
  if (isLoading) {
    return <Loading/>;
  }

  const handleNewPassword = (event) => {
    setNewPassword(event.target.value);
  };

  const handleNewConfirmPassword = (event) => {
    setConfirmNewPassword(event.target.value);
  };
  return (
    isAuthenticated && (
      <Stack>
        <Box>
          <div>
            <div />
            <h3>Password requirements</h3>
            <body>
              Your password must contain: At least 8 characters and At least 3
              of the following:
            </body>
            <body>- Lower case letters (a-z) </body>
            <body>- Upper case letters (A-Z)</body>
            <body>- Numbers (0-9) </body>
            <body>- Special characters (e.g. !@#$%^&*)</body>
            <h3>New password</h3>
            <input
              type="password"
              value={newPassword}
              onChange={handleNewPassword}
            />
            <h3>Confirm new password</h3>
            <input
              type="password"
              value={confirmNewPassword}
              onChange={handleNewConfirmPassword}
            />
            {}
          </div>
          <ChangePasswordButton
            newPassword={newPassword}
            confirmNewPassword={confirmNewPassword}
          />
        </Box>
      </Stack>
    )
  );
}

export default ChangePasswordPage;
