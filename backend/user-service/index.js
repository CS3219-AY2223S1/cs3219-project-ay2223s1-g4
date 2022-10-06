const express = require("express");
const cors = require("cors");
const ManagementClient = require("auth0").ManagementClient;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors()); // config cors so that front-end can use
app.options("*", cors());

var auth0 = new ManagementClient({
  domain: "elgoh.us.auth0.com",
  clientId: "PUubAPfEztzth8dfCnSA0pJT2ib84Rzz",
  clientSecret:
    "y2KKZKBOGVFD85OmCKiW-NjDysXASuEkaNNkibUhuI7-v6bGGuJcTIkV8wlDA2-f",
  scope: "delete:users",
});

app.post("/delete", (req, res) => {
  console.log(req.body);
  res.end("yes");
});

app.listen(8393, () => {
  console.log("Started on PORT 8393");
});
