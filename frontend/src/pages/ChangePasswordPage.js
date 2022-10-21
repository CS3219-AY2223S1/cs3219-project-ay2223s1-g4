import { Box, Stack } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import React, { useState } from "react";
import ChangePasswordButton from "../components/buttons/ChangePasswordButton";
import Loading from "../components/Loading";
import PasswordRequirementAlert from "../components/PasswordRequirementAlert";

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
