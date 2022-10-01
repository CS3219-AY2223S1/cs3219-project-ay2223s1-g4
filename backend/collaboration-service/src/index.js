import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors()); // config cors so that front-end can use
app.options('*', cors());

const router = express.Router();

app.get('/', (req, res) => {
    res.send('Hello World from room-service');
});
app.use("/api", router);

const port = 8002 || process.env.SERVICE_PORT;
app.listen(port, () => console.log(`room-service listening on port ${port}`));
