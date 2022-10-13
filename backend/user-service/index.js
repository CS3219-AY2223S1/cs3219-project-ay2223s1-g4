import express from "express";
const app = express();
app.use(express.json());
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

const checkJwt = auth({
  audience: AUDIENCE,
  issuerBaseURL: ISSUER_BASE_URL,
});

var jwtCheck = expressjwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://elgoh.us.auth0.com/.well-known/jwks.json",
  }),
  audience: "https://user-service.com",
  issuer: "https://elgoh.us.auth0.com/",
  algorithms: ["RS256"],
});
app.use(jwtCheck);

var auth0 = new ManagementClient({
  domain: AUTH0_DOMAIN,
  clientId: AUTH0_CLIENT_ID,
  clientSecret: AUTH0_CLIENT_SECRET,
  scope: AUTH0_SCOPE,
});

app.post("/delete", (req, res) => {
  console.log(req.body.id);
  auth0
    .deleteUser({ id: req.body.id })
    .catch((e) => {
      console.log(e);
    })
    .finally(res.end("completed"));
});

app.listen(PORT, () => {
  console.log("Started on PORT: " + PORT);
});
