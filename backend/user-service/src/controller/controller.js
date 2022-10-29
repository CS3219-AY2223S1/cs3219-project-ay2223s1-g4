import { auth0 } from "../auth/auth.js";

const removeUser = (req, res) => {
  console.log("Removing user id " + req.body.id);
  auth0
    .deleteUser({ id: req.body.id })
    .catch((e) => {
      res.status(e.statusCode).send(e.message).end();
    })
    .finally(res.end("completed"));
};

const updateUserName = (req, res) => {
  console.log("Updating user name for user id " + req.body.id);
  auth0
    .updateUser({ id: req.body.id }, { nickname: req.body.nickname })
    .catch((e) => {
      res.status(e.statusCode).send(e.message).end();
    })
    .finally(res.end("completed"));
};

const updateUserPassword = async (req, res, next) => {
  console.log("Updating user password for user id " + req.body.id);
  try {
    const response = await auth0.updateUser(
      { id: req.body.id },
      { password: req.body.pw }
    );
    console.log(response);
    console.log("no error occured");
    res.end("complete");
  } catch (e) {
    res.status(e.statusCode).send(e.message).end();
  }
};

const getUsername = (req, res) => {
  const userId = decodeURI(req.params.user_id);
  console.log("Get nickname for user with id: " + userId);
  try {
    auth0
      .getUser({ id: userId })
      .then((data) => {
        console.log(data);
        res.send(data.nickname);
      })
      .catch((e) => {
        console.log(e);
        res.status(e.statusCode).send(e.message).end();
      });
  } catch (e) {
    console.log(e);
  }
};

export { removeUser, updateUserName, updateUserPassword, getUsername };
