import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.SERVICE_PORT || 8002;
const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN;
const AUTH0_CLIENT_ID = process.env.AUTH0_CLIENT_ID;
const AUTH0_CLIENT_SECRET = process.env.AUTH0_CLIENT_SECRET;
const AUTH0_SCOPE = process.env.AUTH0_SCOPE;
const ISSUER_BASE_URL = process.env.ISSUER_BASE_URL;
const AUDIENCE = process.env.AUDIENCE;

export {
  PORT,
  AUTH0_DOMAIN,
  AUTH0_CLIENT_ID,
  AUTH0_CLIENT_SECRET,
  AUTH0_SCOPE,
  ISSUER_BASE_URL,
  AUDIENCE,
};
