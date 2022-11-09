import { ManagementClient } from "auth0";
import { auth } from "express-oauth2-jwt-bearer";
import {
  AUTH0_DOMAIN,
  AUTH0_CLIENT_ID,
  AUTH0_CLIENT_SECRET,
  AUTH0_SCOPE,
  ISSUER_BASE_URL,
  AUDIENCE,
} from "../config/config.js";

const checkJwt = auth({
  audience: AUDIENCE,
  issuerBaseURL: ISSUER_BASE_URL,
});

const auth0 = new ManagementClient({
  domain: AUTH0_DOMAIN,
  clientId: AUTH0_CLIENT_ID,
  clientSecret: AUTH0_CLIENT_SECRET,
  scope: AUTH0_SCOPE,
});

export { auth0, checkJwt };
