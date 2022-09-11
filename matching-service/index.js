import express from 'express';
import cors from 'cors';
import router from './controller/matching-routes.js';
import { createServer } from 'http';
import { matchingRepository } from './model/repository.js';

const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors()) // config cors so that front-end can use
app.options('*', cors())

matchingRepository.authenticate()
    .then((result) => {
        console.log("Connection established.");
    })
    .catch((error) => {
        console.log("Unable to connect to db: ", error);
    });

app.get('/', (req, res) => {
    res.send('Hello World from matching-service');
});
app.use("/api", router);

const httpServer = createServer(app)
httpServer.listen(8001);
