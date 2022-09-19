import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";
import {  AUTH0_DOMAIN } from '../../configs'

const DeleteAccount = ({margin, fullWidth}) => {
  const { user, getAccessTokenSilently } = useAuth0();
    const handleClick = () => {
        // TODO: update user data here, using same code that updates form
        const getUserMetadata = async () => {
            const domain = AUTH0_DOMAIN;
        
            try {
              const accessToken = await getAccessTokenSilently({
                audience: `https://${domain}/api/v2/${user.sub}`,
                scope: "update:users",
              });
        
              const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;
        
              const metadataResponse = await fetch(userDetailsByIdUrl, {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              });
        
              const { user_metadata } = await metadataResponse.json();
        
            //   do something to user_metadata and push back to auth0
            } catch (e) {
              console.log(e.message);
            }
          };
    }
  return (
    <Button
      variant={"outlined"}
      sx={{ m: 2 }}
      onClick={()=>{
        if (window.confirm("are you sure you dont want to work for google?")) {
            // Delete account
            handleClick()
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
