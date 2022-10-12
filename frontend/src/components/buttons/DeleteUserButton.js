import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";
import { AUTH0_DOMAIN } from "../../configs";
import axios from "axios";

const DeleteAccount = ({ margin, fullWidth }) => {
  const { user, getAccessTokenSilently } = useAuth0();
  const handleClick = async () => {
    // TODO: update user data here, using same code that updates form
    // const getUserMetadata = async () => {
    //   const domain = AUTH0_DOMAIN;

    //   try {
    //     const accessToken = await getAccessTokenSilently({
    //       audience: `https://${domain}/api/v2/${user.sub}`,
    //       scope: "update:users",
    //     });

    //     const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;

    //     const metadataResponse = await fetch(userDetailsByIdUrl, {
    //       headers: {
    //         Authorization: `Bearer ${accessToken}`,
    //       },
    //     });

    //     const { user_metadata } = await metadataResponse.json();

    //     //   do something to user_metadata and push back to auth0
    //   } catch (e) {
    //     console.log(e.message);
    //   }
    // };

    //TODO: use the same config file as backend to prevent sync problems
    var token;
    fetch("https://elgoh.us.auth0.com/oauth/token", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: '{"client_id":"DDzHSSAHN9vZsaGL0BxDQ36vN5U1qOJH","client_secret":"s1eDnY854jJ-Flc06AxkQgHg8CBeikqouBZwY2proDdNKlZGYsRcNCp_wUP210SS","audience":"https://user-service.com","grant_type":"client_credentials"}',
    })
      .then(res => res.json()).then(json => {
        token = json.access_token
      })
      .catch((e) => {
        console.log(e);
      });
      const deleteApiUrl = "http://localhost:8393/delete";
      try {
        const response = await fetch(deleteApiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response);
        // window.location.replace("/");
      } catch (e) {
        console.log(e);
      }
  };
  return (
    <Button
      variant={"outlined"}
      sx={{ m: 2 }}
      onClick={() => {
        if (
          window.confirm(
            "Are you sure that you would like to delete your account?"
          )
        ) {
          // Delete account
          handleClick();
        }
      }}
      margin={margin}
      fullWidth={Boolean(fullWidth)}
    >
      {/*  TODO: 1. Add a flag is_active in metadata or 2.
    https://community.auth0.com/t/allow-currently-logged-in-user-of-web-app-to-delete-their-account/60022 
    */}
      Delete My Account
    </Button>
  );
};

export default DeleteAccount;
