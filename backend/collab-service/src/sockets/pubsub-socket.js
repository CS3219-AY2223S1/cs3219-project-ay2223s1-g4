import { io } from 'socket.io-client'; 
import { PUBSUB_SUBSCRIPTIONS, ROOM_CREATED_TAG } from '../configs/config.js';
import { createSessionFromRoomId } from '../service/service.js';

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
        socket.on(ROOM_CREATED_TAG, (data) => {
            createSessionFromRoomId(data.roomId);
        });
    };

    return {
        connect: connect
    };
})();

export default PubSubSocketManager;
