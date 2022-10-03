import express from 'express';
import cors from 'cors';
import router from './routes/routes.js';
import MatchSocketManager from './sockets/match-socket.js';
import PubSubSocketManager from './sockets/pubsub-socket.js';
import Respository from './model/repository.js';
import { PORT, PUBSUB_URL } from './configs/config.js';

const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors()) // config cors so that front-end can use
app.options('*', cors())
app.use("/api", router);

let httpServer = app.listen(PORT, () => {
    console.log(`matching-service listening on port ${PORT}`)
});

Respository.start();
MatchSocketManager.bind(httpServer);
PubSubSocketManager.connect(PUBSUB_URL);
