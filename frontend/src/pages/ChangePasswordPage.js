import { Box, Stack } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import React, { useState } from "react";
import ChangePasswordButton from "../components/buttons/ChangePasswordButton";

function ChangePasswordPage() {
  const { isAuthenticated, isLoading } = useAuth0();
  const { newPassword, setNewPassword } = useState("");
  const { confirmNewPassword, setNewConfirmationPassword } = useState("");
  if (isLoading) {
    return <div>Loading ...</div>;
  }

  const handleNewPassword = (event) => {
    setNewPassword(event.target.value);
  };

  const handleNewConfirmPassword = (event) => {
    setNewConfirmationPassword(event.target.value);
  };
  return (
    isAuthenticated && (
      <Stack>
        <Box>
          <div>
            <div />
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
