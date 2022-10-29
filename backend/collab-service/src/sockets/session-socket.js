import { Server } from 'socket.io';
import SessionORM from '../models/session-orm.js';
import { getDocumentGivenRoomId, updateDocumentFromRoomId } from '../service/service.js';

let SessionSocketManager = (function() {
    var io;

    function bindSocket(httpServer) {
        io = new Server(httpServer, {
            cors: { origin: '*' }
        });
        console.log('SessionSocketManager has binded with server');
        initSocketRules();
        initCodeRules();
    };

    function initSocketRules() {
        io.on('connection', (socket) => {
            console.log(`Connected with socket id ${socket.id}`);
            console.log(`Setting socket rules for socket id ${socket.id}`);

            socket.on('join-room', (room) => {
                socket.join(room);
                console.log(`Socket id ${socket.id} joined room ${room}`);
                setTimeout(() => socket.broadcast.to(room).emit('peer-join-room'), 1 * 1000);
            });

            socket.on('end-session', (room) => {
                console.log(`Socket id ${socket.id} is ending session for ${room}`);
                socket.broadcast.to(room).emit('end-session');
            });

            socket.on('disconnecting', () => {
                for (const r of socket.rooms) {
                    if (r.startsWith('room')) {
                        console.log(`Socket id ${socket.id} broke from room ${r}`);
                        socket.broadcast.to(r).emit('break-room');
                        setTimeout(() => checkIfCanClose(r), 10 * 1000);
                    }
                }
            });
        });
    };

    function initCodeRules() {
        io.on('connection', (socket) => {
            console.log(`Setting code rules for socket id ${socket.id}`);
            
            socket.on("get-code", async (roomId) => {
                console.log(`Getting code for ${roomId}`);
                const document = await getDocumentGivenRoomId(roomId);
                socket.emit("load-code", document);
                
                socket.on('send-code', (data, room) => {
                    socket.broadcast.to(room).emit('receive-code', data);
                });

                socket.on("save-code", async (roomId, document) => {
                    await updateDocumentFromRoomId(roomId, document);
                });
            });
        });
    };

    function checkIfCanClose(room) {
        console.log(io.sockets.adapter.rooms);
        if (!(io.sockets.adapter.rooms.has(room))) {
            console.log(`Closed ${room} as no more clients are present`);
            SessionORM.closeSessionByRoomId(room.substring(5));
        }
    }

    return {
        bind: bindSocket,
    };
})();

export default SessionSocketManager;
