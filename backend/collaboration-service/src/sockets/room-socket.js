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
            socket.on('code', (data, room) => {
                socket.broadcast.to(room).emit('sync-code', data);
            });
            socket.on('chat', (data, room) => {
                socket.broadcast.to(room).emit('sync-chat', data);
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
