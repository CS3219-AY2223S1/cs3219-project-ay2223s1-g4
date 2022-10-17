import { auth0 } from "../auth/auth.js";

const removeUser = (req, res) => {
    console.log('Removing user id ' + req.body.id);
    auth0
        .deleteUser({ id: req.body.id })
        .catch((e) => {
            console.log(e);
            res.status(500).end();
        })
        .finally(res.end("completed"));
}

const updateUserName = (req, res) => {
    console.log('Updating user name for user id ' + req.body.id);
    auth0
        .updateUser({ id: req.body.id }, { nickname: req.body.nickname })
        .catch((e) => {
            console.log(e);
            res.status(500).end();
        })
        .finally(res.end("completed"));
}

const updateUserPassword = async (req, res, next) => {
    console.log('Updating user password for user id ' + req.body.id);
    try {
        const response = await auth0.updateUser(
            { id: req.body.id },
            { password: req.body.pw }
        );
        console.log(response);
        console.log("no error occured");
        res.end("complete");
        
    } catch (e) {
        console.log(e.message);
        res.status(500).end();
    }
}

export { removeUser, updateUserName, updateUserPassword };
