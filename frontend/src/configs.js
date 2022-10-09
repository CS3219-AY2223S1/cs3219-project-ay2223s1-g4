export const URI_USER_SVC = process.env.URI_USER_SVC || 'http://localhost:8000';
export const URI_MATCHING_SVC = process.env.URI_MATCHING_SVC || 'http://localhost:8001';
export const URI_COLLAB_SVC = process.env.URI_COLLAB_SVC || 'http://localhost:8002';

const PREFIX_USER_SVC = '/api/user';
const PREFIX_MATCH_SVC = '/api/match';
const PREFIX_ROOM_SVC = '/api/room';

export const URL_USER_SVC = URI_USER_SVC + PREFIX_USER_SVC;
export const URL_MATCHING_MATCH_SVC = URI_MATCHING_SVC + PREFIX_MATCH_SVC;
export const URL_MATCHING_ROOM_SVC = URI_COLLAB_SVC + PREFIX_ROOM_SVC;

export const AUTH0_DOMAIN = "elgoh.us.auth0.com"
export const AUTH0_CLIENT_ID = "3CVQjahdc8e1z1cUdqsZMw15FfhqylxW"
export const AUTH0_SCOPE = "read:current_user update:current_user_metadata"
