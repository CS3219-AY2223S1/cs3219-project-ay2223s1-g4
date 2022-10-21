import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "react-bootstrap/Button";
const UpdateUsernameButton = (props) => {
  const { user } = useAuth0();
  const handleClick = async (nickname) => {
    console.log(props.input);
    const updateUserNameApiUrl = "http://localhost:8393/updateusername";
    fetch("https://elgoh.us.auth0.com/oauth/token", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: '{"client_id":"DDzHSSAHN9vZsaGL0BxDQ36vN5U1qOJH","client_secret":"s1eDnY854jJ-Flc06AxkQgHg8CBeikqouBZwY2proDdNKlZGYsRcNCp_wUP210SS","audience":"https://user-service.com","grant_type":"client_credentials"}',
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        fetch(updateUserNameApiUrl, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${json.access_token}`,
          },
          body: JSON.stringify({
            id: user.sub,
            nickname: nickname,
          }),
        }).then((resp) => {
          console.log(resp);
          props.updateNickname(nickname);
          window.confirm("Nickname has been updated!");
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <Button
      variant="outline-primary"
      onClick={() => {
        if (
          window.confirm(
            "Are you sure that you would like to change your nickname?"
          )
        ) {
          // Delete account
          handleClick(props.input);
        }
      }}
    >
      {/*  TODO: 1. Add a flag is_active in metadata or 2.
    https://community.auth0.com/t/allow-currently-logged-in-user-of-web-app-to-delete-their-account/60022 
    */}
      Update nickname
    </Button>
  );
};

export default UpdateUsernameButton;
