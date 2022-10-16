import { Box, Stack } from "@mui/material";
import Profile from "../components/user/Profile";
import { useAuth0 } from "@auth0/auth0-react";
import React, { useState } from "react";
import UpdateDetailsForm from "../components/form/UpdateDetailsForm";
import DeleteAccount from "../components/buttons/DeleteUserButton";
import UpdateUsernameButton from "../components/buttons/UpdateUsernameButton";
import ChangePasswordButton from "../components/buttons/ChangePasswordButton";
import { Button } from "@mui/material";
import Link from "@mui/material/Link";

function ProfilePage() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [username, setUsername] = useState("");
  if (isLoading) {
    return <div>Loading ...</div>;
  }

  const handleUpdate = (event) => {
    setUsername(event.target.value);
  };

  const removeText = () => {
    setUsername("");
  };

  return (
    isAuthenticated && (
      <Stack>
        <Box>
          <div>
            <img src={user.picture} alt={user.name} />
            <h3>Nickname (other users will see)</h3>
            <body1>{user.nickname}</body1>
            <div />
            <input type="text" value={username} onChange={handleUpdate} />
            <UpdateUsernameButton input={username} onClick={removeText} />
            <h3>Email</h3>
            <p>{user.email}</p>
            {}
          </div>
        </Box>
        <Box>
          <Link key="Change password" href="/ChangePasswordPage">
            <Button
              variant={"outlined"}
              style={{
                borderRadius: 35,
              }}
              sx={{ m: 2 }}
              key="Change password"
            >
              Change password
            </Button>
          </Link>
        </Box>
        <Box></Box>
        <Box>
          <DeleteAccount />
        </Box>
      </Stack>
    )
  );
}

export default ProfilePage;
