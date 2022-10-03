import MatchModel from '../model/match-model.js';
import { Server } from 'socket.io';

let MatchSocketManager = (function() {
    var io;

    function bindSocket(httpServer) {
        io = new Server(httpServer, {
            cors: { origin: '*' }
        });
        console.log('MatchSocketManager has binded with server');
        initSocketRules();
    };

    function initSocketRules() {
        io.on('connection', (socket) => {
            socket.on('join-room', (room) => {
                socket.join(room);
                console.log(`Socket id ${socket.id} joined ${room}`);
            });
            socket.on('leave-room', (room) => {
                console.log(`Socket id ${socket.id} left ${room}`);
            });
        });
    };

    function pushRoomDetails(details) {
        MatchModel.findOne({userid: details.userId1}).then((m1) => {
            MatchModel.findOne({userid: details.userId2}).then((m2) => {
                io.in(`match-${m1._id}`).emit('provide-room', details.roomId);
                io.in(`match-${m2._id}`).emit('provide-room', details.roomId);
            });
        });
    }

    return {
        bind: bindSocket,
        pushRoomDetails: pushRoomDetails,
    };
})();

export default MatchSocketManager;
