import express from "express";
import { auth } from "express-oauth2-jwt-bearer";
import cors from "cors";
import { ManagementClient } from "auth0";
import {
  PORT,
  AUTH0_DOMAIN,
  AUTH0_CLIENT_ID,
  AUTH0_CLIENT_SECRET,
  AUTH0_SCOPE,
  ISSUER_BASE_URL,
  AUDIENCE,
} from "./config/config.js";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors()); // config cors so that front-end can use
app.options("*", cors());

const checkJwt = auth({
  audience: AUDIENCE,
  issuerBaseURL: ISSUER_BASE_URL,
});

var auth0 = new ManagementClient({
  domain: AUTH0_DOMAIN,
  clientId: AUTH0_CLIENT_ID,
  clientSecret: AUTH0_CLIENT_SECRET,
  scope: AUTH0_SCOPE,
});

app.post("/delete", checkJwt, (req, res) => {
  console.log(req);
  // console.log(req.body.user.sub);
  // auth0
  //   .deleteUser({ id: req.body.user.sub })
  //   .catch((e) => {
  //     console.log(e);
  //   })
  //   .finally(res.end("completed"));
});

app.listen(PORT, () => {
  console.log("Started on PORT: " + PORT);
});
