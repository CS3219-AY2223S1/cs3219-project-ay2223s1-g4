import { Server } from 'socket.io';
import { getDocumentGivenId, updateDocumentGivenId } from '../service/service.js';

let RoomSocketManager = (function() {
    var io;

    function bindSocket(httpServer) {
        io = new Server(httpServer, {
            cors: { origin: '*' }
        });
        console.log('RoomSocketManager has binded with server');
        initSocketRules();
    };

    function initSocketRules() {
        io.on('connection', (socket) => {
            console.log(`Connected with socket id ${socket.id}`);
            socket.on('join-room', (room) => {
                socket.join(room);
                console.log(`Socket id ${socket.id} joined room ${room}`);
            });
            socket.on("get-code", async (roomId) => {
                console.log(`Getting code for ${roomId}`);
                const document = await getDocumentGivenId(roomId);
                socket.emit("load-code", document);
                
                socket.on('send-code', (data, room) => {
                    socket.broadcast.to(room).emit('receive-code', data);
                });
                socket.on("save-code", async (roomId, document) => {
                    await updateDocumentGivenId(roomId, document);
                });
            });
            socket.on('leave-room', (room) => {
                console.log(`Socket id ${socket.id} left room ${room}`);
                socket.broadcast.to(room).emit('leave-room');
            });
        });
    };

    return {
        bind: bindSocket,
    };
})();

export default RoomSocketManager;
