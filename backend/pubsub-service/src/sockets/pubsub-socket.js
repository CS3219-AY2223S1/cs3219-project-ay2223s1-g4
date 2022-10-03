import { Server } from 'socket.io';

let PubSubSocketManager = (function() {
    var io;

    function bindSocket(httpServer) {
        io = new Server(httpServer, {
            cors: { origin: '*' }
        });
        console.log('PubSubSocketManager has binded with server');
        initSocketRules();
    };

    function initSocketRules() {
        io.on('connection', (socket) => {
            console.log(`Connected with socket id ${socket.id}`);
            socket.on('publish', (event, headers, args) => {
                console.log(`Event published by ${socket.id} | ${event} | ${headers} | ${JSON.stringify(args)}`);
                /* Authorization goes here... */
                io.to(event).emit(event, args);
            });
            socket.on('subscribe', (room) => {
                socket.join(room);
                console.log(`Socket id ${socket.id} joined ${room}`);
            });
        });
    };

    return {
        bind: bindSocket
    };
})();

export default PubSubSocketManager;
