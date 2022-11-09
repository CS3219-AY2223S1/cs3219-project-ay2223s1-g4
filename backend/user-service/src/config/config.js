import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.SERVICE_PORT || 8393;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN;
const AUTH0_CLIENT_ID = process.env.AUTH0_CLIENT_ID;
const AUTH0_CLIENT_SECRET = process.env.AUTH0_CLIENT_SECRET;
const AUTH0_SCOPE = process.env.AUTH0_SCOPE;
const AUDIENCE = process.env.AUDIENCE;
const JWKS_URI = process.env.JWKS_URI;
const ISSUER_BASE_URL = process.env.ISSUER_BASE_URL;

const generateMessage = (title) => {
    return `Make sure you have ${title} in your .env file`;
}

if (AUTH0_DOMAIN == null) {
    throw generateMessage("AUTH0_DOMAIN");
}
if (AUTH0_CLIENT_ID == null) {
    throw generateMessage("AUTH0_CLIENT_ID");
}
if (AUTH0_CLIENT_SECRET == null) {
    throw generateMessage("AUTH0_CLIENT_SECRET");
}
if (AUTH0_SCOPE == null) {
    throw generateMessage("AUTH0_SCOPE");
}
if (ISSUER_BASE_URL == null) {
    throw generateMessage("ISSUER_BASE_URL");
}
if (AUDIENCE == null) {
    throw generateMessage("AUDIENCE");
}
if (JWKS_URI == null) {
    throw generateMessage("JWKS_URI");
}

export {
    PORT,
    FRONTEND_URL,
    AUTH0_DOMAIN,
    AUTH0_CLIENT_ID,
    AUTH0_CLIENT_SECRET,
    AUTH0_SCOPE,
    AUDIENCE,
    JWKS_URI,
    ISSUER_BASE_URL,
};
