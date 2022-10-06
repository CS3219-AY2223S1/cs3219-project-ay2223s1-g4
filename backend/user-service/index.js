const express = require("express");
const cors = require("cors");
const ManagementClient = require("auth0").ManagementClient;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors()); // config cors so that front-end can use
app.options("*", cors());

const AUTH0_DOMAIN = "elgoh.us.auth0.com";
const AUTH0_CLIENT_ID = "PUubAPfEztzth8dfCnSA0pJT2ib84Rzz";
const AUTH0_CLIENT_SECRET =
  "y2KKZKBOGVFD85OmCKiW-NjDysXASuEkaNNkibUhuI7-v6bGGuJcTIkV8wlDA2-f";
const AUTH0_SCOPE = "delete:users";

var auth0 = new ManagementClient({
  domain: AUTH0_DOMAIN,
  clientId: AUTH0_CLIENT_ID,
  clientSecret: AUTH0_CLIENT_SECRET,
  scope: AUTH0_SCOPE,
});

app.post("/delete", (req, res) => {
  console.log(req.body.user.sub);
  auth0
    .deleteUser({ id: req.body.user.sub })
    .catch((e) => {
      console.log(e);
    })
    .finally(res.end("completed"));
});

app.listen(8393, () => {
  console.log("Started on PORT 8393");
});
