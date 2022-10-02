import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.SERVICE_PORT || 8002;
const DB_URI = (process.env.ENV === 'PROD')
    ? process.env.DB_CLOUD_URI
    : process.env.DB_LOCAL_URI;

if (DB_URI === null || DB_URI === undefined) {
    throw new Error('Database URI is not defined');
}

export { PORT, DB_URI };
