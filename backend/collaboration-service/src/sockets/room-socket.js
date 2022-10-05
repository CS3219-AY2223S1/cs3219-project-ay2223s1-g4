import { Server } from 'socket.io';

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
            socket.on('send-code', (data, room) => {
                socket.broadcast.to(room).emit('receive-code', data);
            });
            socket.on('send-chat', (data, room) => {
                socket.broadcast.to(room).emit('receive-chat', data);
            });
            socket.on('leave-room', (room) => {
                console.log(`Socket id ${socket.id} left room ${room}`);
            });
        });
    };

    return {
        bind: bindSocket,
    };
})();

export default RoomSocketManager;
