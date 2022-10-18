import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";

const ChangePasswordButton = (props) => {
  const { user } = useAuth0();
  const handleClick = async (password) => {
    const changePasswordApiUrl = "http://localhost:8393/changepassword";
    fetch("https://elgoh.us.auth0.com/oauth/token", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: '{"client_id":"DDzHSSAHN9vZsaGL0BxDQ36vN5U1qOJH","client_secret":"s1eDnY854jJ-Flc06AxkQgHg8CBeikqouBZwY2proDdNKlZGYsRcNCp_wUP210SS","audience":"https://user-service.com","grant_type":"client_credentials"}',
    })
      .then((res) => res.json())
      .then((json) => {
        fetch(changePasswordApiUrl, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${json.access_token}`,
          },
          body: JSON.stringify({
            id: user.sub,
            pw: password,
          }),
        }).then((resp) => {
          console.log(resp.ok);
          if (resp.ok) {
            window.confirm("Password successfully updated!");
          } else {
            window.confirm("Password did not fulfill the requirements!");
          }
        });
      })
      .catch((e) => {
        console.log(e.message);
        // TODO: extract error message from e.
        window.confirm("Password failed to get updated");
      });
  };
  return (
    <Button
      variant={"outlined"}
      style={{
        borderRadius: 35,
      }}
      sx={{ m: 2 }}
      onClick={() => {
        if (props.newPassword !== props.confirmNewPassword) {
          window.confirm(
            "Passwords are different. Please ensure that both passwords are the same."
          );
        } else if (
          window.confirm(
            "Are you sures that you would like to change your password?"
          )
        ) {
          // Delete account
          handleClick(props.newPassword);
        }
      }}
    >
      {/*  TODO: 1. Add a flag is_active in metadata or 2.
    https://community.auth0.com/t/allow-currently-logged-in-user-of-web-app-to-delete-their-account/60022 
    */}
      Change password
    </Button>
  );
};

export default ChangePasswordButton;
