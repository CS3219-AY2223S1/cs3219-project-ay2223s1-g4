import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "react-bootstrap/Button";
import { AUTH0_USER_SERVICE, URL_USER_SVC } from "../../configs";

const UpdateUsernameButton = (props) => {
  const { user, getAccessTokenSilently } = useAuth0();
  const handleClick = async (nickname) => {
    console.log(props.input);

    const updateUserNameApiUrl = `${URL_USER_SVC}/updateusername`;
    getAccessTokenSilently({
      audience: AUTH0_USER_SERVICE,
    })
      .then((token) => {
        fetch(updateUserNameApiUrl, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
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
      Update nickname
    </Button>
  );
};

export default UpdateUsernameButton;
