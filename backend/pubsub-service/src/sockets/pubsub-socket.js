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
            socket.on('publish', (event, _, args) => {
                console.log(`Event published by ${socket.id} to topic '${event}' | ${JSON.stringify(args)}`);
                io.to(event).emit(event, args);
            });
            socket.on('subscribe', (room) => {
                socket.join(room);
                console.log(`Socket id ${socket.id} subscribed to '${room}'`);
            });
            socket.on('disconnecting', () => {
                console.log(`Socket id ${socket.id} has left`)
            })
        });
    };

    return {
        bind: bindSocket
    };
})();

export default PubSubSocketManager;
