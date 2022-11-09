import express from 'express';
import cors from 'cors';
import router from './routes/routes.js';
import PubSubSocketManager from './sockets/pubsub-socket.js';
import Respository from './models/repository.js';
import { PORT, CLIENT_URL, PUBSUB_URL } from './configs/config.js';

const app = express();
const corsObj = cors({
    origin: CLIENT_URL
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(corsObj); 
app.options('*', corsObj);
app.use("/api", router);

app.listen(PORT, () => {
    console.log(`room-service listening on port ${PORT}`);
});

Respository.start();
PubSubSocketManager.connect(PUBSUB_URL);

export default app;
