import express from 'express';
import cors from 'cors';
import router from './routes/routes.js';
import { PORT } from './configs/config.js';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors()); // config cors so that front-end can use
app.options('*', cors());

app.get('/', (req, res) => {
    res.send('Hello World from room-service');
});
app.use("/api", router);

app.listen(PORT, () => {
    console.log(`room-service listening on port ${PORT}`)
});
