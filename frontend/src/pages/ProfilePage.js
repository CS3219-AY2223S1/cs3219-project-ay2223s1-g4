import { Box, Stack } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import React, { useState } from "react";
import DeleteAccount from "../components/buttons/DeleteUserButton";
import UpdateUsernameButton from "../components/buttons/UpdateUsernameButton";
import Button from "react-bootstrap/Button";
import Link from "@mui/material/Link";
import Loading from "../components/loading";

function ProfilePage() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [username, setUsername] = useState(""); // This is for the input, it is also nickname
  const [nickname, setNickname] = useState(user.nickname);

  if (isLoading) {
    return <Loading />;
  }

  const handleUpdate = (event) => {
    setUsername(event.target.value);
  };

  const removeText = () => {
    setUsername("");
  };

  const updateNickname = (nickname) => {
    setNickname(nickname);
  };

  return (
    isAuthenticated && (
      <Stack>
        <Box>
          <div>
            <img src={user.picture} alt={user.name} />
            <br />
            <br />
            <h4>Nickname: </h4>
            <body>{nickname}</body>
            <br />
            <input
              placeholder="New nickname"
              type="text"
              value={username}
              onChange={handleUpdate}
            />
            <br />
            <br />
            <UpdateUsernameButton
              sx={{ mt: 2 }}
              input={username}
              onClick={removeText}
              updateNickname={updateNickname}
            />
            <br />
            <br />
            <h3>Email</h3>
            <p>{user.email}</p>
          </div>
        </Box>
        <Box>
          <Link key="Change password" href="/change-password">
            <Button variant="outline-primary" key="Change password">
              Change password
            </Button>
          </Link>
        </Box>
        <br />
        <Box>
          <DeleteAccount />
        </Box>
      </Stack>
    )
  );
}

export default ProfilePage;
