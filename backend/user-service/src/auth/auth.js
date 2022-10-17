import jwksRsa from "jwks-rsa";
import { ManagementClient } from "auth0";
import { expressjwt } from "express-jwt";
import {
    AUTH0_DOMAIN,
    AUTH0_CLIENT_ID,
    AUTH0_CLIENT_SECRET,
    AUTH0_SCOPE,
    ISSUER_BASE_URL,
    AUDIENCE,
    JWKS_URI
} from "../config/config.js";

const jwtCheck = expressjwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: JWKS_URI,
    }),
    audience: AUDIENCE,
    issuer: ISSUER_BASE_URL,
    algorithms: ["RS256"],
});
  
const auth0 = new ManagementClient({
    domain: AUTH0_DOMAIN,
    clientId: AUTH0_CLIENT_ID,
    clientSecret: AUTH0_CLIENT_SECRET,
    scope: AUTH0_SCOPE,
});

export { jwtCheck, auth0 };
