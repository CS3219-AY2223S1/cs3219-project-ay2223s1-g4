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
    res.send('Hello World from question-service');
});
app.use("/api", router);

const port = 8003 || process.env.SERVICE_PORT;
app.listen(port, () => console.log(`question-service listening on port ${port}`));
