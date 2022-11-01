import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "react-bootstrap/Button";
import { AUTH0_USER_SERVICE, URL_USER_SVC } from "../../configs";

const ChangePasswordButton = (props) => {
  const { user, getAccessTokenSilently } = useAuth0();
  const handleClick = async (password) => {
    const changePasswordApiUrl = `${URL_USER_SVC}/changepassword`;
    getAccessTokenSilently({
      audience: AUTH0_USER_SERVICE,
    })
      .then((token) => {
        fetch(changePasswordApiUrl, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
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
      variant="outline-danger"
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
