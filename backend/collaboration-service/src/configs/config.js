import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.SERVICE_PORT || 8002;
const CLIENT_URL = process.env.CLIENT_URL || '*';

const PUBSUB_URL = process.env.PUBSUB_URL || 'http://localhost:8004';
const ROOM_CREATE_TAG = 'room.create';
const PUBSUB_SUBSCRIPTIONS = [
    ROOM_CREATE_TAG
];
const ROOM_CREATED_TAG = 'room.created';
const PUBSUB_PUBLISHERS = [
    ROOM_CREATED_TAG
];

const DB_URI = (process.env.ENV === 'PROD')
    ? process.env.DB_CLOUD_URI
    : process.env.DB_LOCAL_URI;
if (DB_URI === null || DB_URI === undefined) {
    console.error('Database URI is not defined');
    process.exit(1);
}

export {
    PORT,
    DB_URI,
    CLIENT_URL,
    ROOM_CREATE_TAG,
    PUBSUB_URL,
    PUBSUB_SUBSCRIPTIONS,
    ROOM_CREATED_TAG, 
    PUBSUB_PUBLISHERS
};
