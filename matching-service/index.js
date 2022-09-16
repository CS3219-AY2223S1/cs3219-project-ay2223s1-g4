import express from 'express';
import cors from 'cors';
import router from './controller/matching-routes.js';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors()) // config cors so that front-end can use
app.options('*', cors())

app.get('/', (req, res) => {
    res.send('Hello World from matching-service');
});
app.use("/api", router);

const httpServer = createServer(app)
httpServer.listen(8001);

const io = new Server(httpServer, {
    cors: { origin: '*' }
});

io.on("connection", (socket) => {
    console.log(`Connected with socket id ${socket.id}`);
    socket.on('join-room', (room) => {
        socket.join(room);
        console.log(`Socket id ${socket.id} joined room ${room}`);
    });
});

export { io };
