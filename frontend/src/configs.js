export const URI_USER_SVC = process.env.URI_USER_SVC || "http://localhost:8393";
export const URI_MATCHING_SVC =
  process.env.URI_MATCHING_SVC || "http://localhost:8001";
export const URI_ROOM_SVC = process.env.URI_ROOM_SVC || "http://localhost:8002";
export const URI_QUESTION_SVC =
  process.env.URI_QUESTION_SVC || "http://localhost:8003";
export const URI_COLLAB_SVC =
  process.env.URI_COLLAB_SVC || "http://localhost:8005";

const PREFIX_COLLAB_SVC = "/api/collab";
const PREFIX_USER_SVC = "/api/user";
const PREFIX_MATCH_SVC = "/api/match";
const PREFIX_ROOM_SVC = "/api/room";
const PREFIX_QUESTION_SVC = "/api/question";
const PREFIX_USER_HISTORY = "/api/room/user/";

export const URL_USER_SVC = URI_USER_SVC + PREFIX_USER_SVC;
export const URL_MATCHING_MATCH_SVC = URI_MATCHING_SVC + PREFIX_MATCH_SVC;
export const URL_MATCHING_ROOM_SVC = URI_ROOM_SVC + PREFIX_ROOM_SVC;
export const URL_QUESTION = URI_QUESTION_SVC + PREFIX_QUESTION_SVC;
export const URL_COLLAB_SVC = URI_COLLAB_SVC + PREFIX_COLLAB_SVC;
export const URL_HISTORY_ENDPT = URI_ROOM_SVC + PREFIX_USER_HISTORY;

export const AUTH0_DOMAIN = process.env.REACT_APP_AUTH0_DOMAIN;
export const AUTH0_CLIENT_ID = process.env.REACT_APP_AUTH0_CLIENT_ID;
export const AUTH0_SCOPE = "read:current_user update:current_user_metadata";
export const AUTH0_USER_SERVICE = process.env.REACT_APP_AUTH0_USER_SERVICE;
