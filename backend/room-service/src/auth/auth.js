import jwt_decode from 'jwt-decode';
import { auth } from "express-oauth2-jwt-bearer";
import { AUTH0_AUDIENCE, AUTH0_ISSUER_BASE_URL } from '../configs/config.js';

const checkJwtWithAuth0 = auth({
    audience: AUTH0_AUDIENCE,
    issuerBaseURL: AUTH0_ISSUER_BASE_URL,
});

let Authenticator = {
    checkJwt: async (req, res, next) => {
        checkJwtWithAuth0(req, res, next);
    },

    extractUserSub: (req) => {
        const rawToken = req.headers.authorization.split(" ")[1];
        return jwt_decode(rawToken).sub;
    },
    
    extractToken: (req) => {
        return req.headers.authorization.split(" ")[1];
    },
}

export default Authenticator;
