import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "react-bootstrap/Button";
import { AUTH0_USER_SERVICE, URL_USER_SVC } from "../../configs";

const DeleteAccount = ({ margin, fullWidth }) => {
  const { user, getAccessTokenSilently } = useAuth0();
  const handleClick = async () => {
    const deleteApiUrl = `${URL_USER_SVC}/delete`;
    getAccessTokenSilently({
      audience: AUTH0_USER_SERVICE,
    })
      .then((token) => {
        fetch(deleteApiUrl, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            id: user.sub,
          }),
        }).then((resp) => {
          console.log(resp);
          window.location.replace("/");
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <Button
      variant="danger"
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
