import { io } from 'socket.io-client'; 
import { PUBSUB_SUBSCRIPTIONS, ROOM_CREATED_TAG, ROOM_CREATE_TAG } from '../configs/config.js';
import { createRoom } from '../service/service.js';

let PubSubSocketManager = (function() {
    var socket;

    function connect(url) {
        socket = io(url);
        console.log(`PubSubSocketManager has binded with server ${url}`);
        setRules();
    };

    function setRules() {
        PUBSUB_SUBSCRIPTIONS.forEach((event) => {
            socket.emit('subscribe', event);
        });
        socket.on(ROOM_CREATE_TAG, (data) => {
            handleRoomCreate(data);
        });
    };

    function handleRoomCreate(data) {
        createRoom(
            data.userid1,
            data.userid2,
            data.difficulty
        ).then((room) => {
            socket.emit('publish', ROOM_CREATED_TAG, null, {
                roomId: room._id,
                userId1: room.userid1,
                userId2: room.userid2,
            });
        });
    };

    return {
        connect: connect
    };
})();

export default PubSubSocketManager;
