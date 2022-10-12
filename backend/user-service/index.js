import express from "express";
const app = express();
import cors from "cors";
import { ManagementClient } from "auth0";
import { expressjwt } from "express-jwt";
import jwksRsa from "jwks-rsa";
import { auth, requiredScopes } from "express-oauth2-jwt-bearer";
import dotenv from "dotenv";
import {
  PORT,
  AUTH0_DOMAIN,
  AUTH0_CLIENT_ID,
  AUTH0_CLIENT_SECRET,
  AUTH0_SCOPE,
  ISSUER_BASE_URL,
  AUDIENCE,
} from "./config/config.js";

dotenv.config();
if (!process.env.ISSUER_BASE_URL || !AUDIENCE) {
  throw "Make sure you have ISSUER_BASE_URL, and AUDIENCE in your .env file";
}
const corsOptions = {
  origin: "http://localhost:3000",
};
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const checkJwt = auth();

var auth0 = new ManagementClient({
  domain: AUTH0_DOMAIN,
  clientId: AUTH0_CLIENT_ID,
  clientSecret: AUTH0_CLIENT_SECRET,
  scope: AUTH0_SCOPE,
});

app.get("/delete", checkJwt, (req, res) => {
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
