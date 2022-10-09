import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.SERVICE_PORT || 8002;

export { PORT };
