import express from 'express';
import cors from 'cors';
import PubSubSocketManager from './sockets/pubsub-socket.js';
import { PORT } from './configs/config.js';

const app = express();
const corsObj = cors({
    origin: '*'
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(corsObj); 
app.options('*', corsObj);

let httpServer = app.listen(PORT, () => {
    console.log(`pubsub-service listening on port ${PORT}`)
});

PubSubSocketManager.bind(httpServer);
