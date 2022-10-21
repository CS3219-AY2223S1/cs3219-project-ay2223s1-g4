import { Box, Stack } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import React, { useState } from "react";
import ChangePasswordButton from "../components/buttons/ChangePasswordButton";
import PasswordRequirementAlert from "../components/PasswordRequirementAlert";
import Badge from "react-bootstrap/Badge";

function ChangePasswordPage() {
  const { isAuthenticated, isLoading } = useAuth0();
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  if (isLoading) {
    return <div>Loading ...</div>;
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
            <PasswordRequirementAlert></PasswordRequirementAlert>
            <br />
            <body>New password </body>
            <input
              type="password"
              placeholder="new password"
              value={newPassword}
              onChange={handleNewPassword}
            />

            <br />
            <br />
            <body>Confirm new password </body>
            <input
              type="password"
              placeholder="new password"
              value={confirmNewPassword}
              onChange={handleNewConfirmPassword}
            />
            {}
          </div>
          <br />
          <br />
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
