export const URI_USER_SVC = process.env.URI_USER_SVC || 'http://localhost:8000';
export const URI_MATCHING_SVC = process.env.URI_MATCHING_SVC || 'http://localhost:8001';

const PREFIX_USER_SVC = '/api/user';
const PREFIX_MATCH_SVC = '/api/match';
const PREFIX_ROOM_SVC = '/api/room';

export const URL_USER_SVC = URI_USER_SVC + PREFIX_USER_SVC;
export const URL_MATCHING_MATCH_SVC = URI_MATCHING_SVC + PREFIX_MATCH_SVC;
export const URL_MATCHING_ROOM_SVC = URI_MATCHING_SVC + PREFIX_ROOM_SVC;
