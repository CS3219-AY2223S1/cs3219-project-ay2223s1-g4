import { io } from 'socket.io-client'; 
import { PUBSUB_SUBSCRIPTIONS, ROOM_CREATED_TAG } from '../configs/config.js';
import MatchSocketManager from './match-socket.js';

let PubSubSocketManager = (function() {
    var socket;

    function connect(url) {
        socket = io(url);
        socket.on("connect", () => { 
            console.log(`PubSubSocketManager has binded with server ${url}`);
        });
        setRules();
    };

    function setRules() {
        PUBSUB_SUBSCRIPTIONS.forEach((event) => {
            socket.emit('subscribe', event);
        });
        socket.on(ROOM_CREATED_TAG, (data) => {
            console.log("\x1b[32m%s\x1b[0m", `Received from event ${ROOM_CREATED_TAG} data ${JSON.stringify(data)}`);
            MatchSocketManager.pushRoomDetails(data);
        });
    };

    function publish(event, data) {
        console.log("\x1b[32m%s\x1b[0m", `Publishing to ${event} with data ${JSON.stringify(data)}`);
        socket.emit('publish', event, null, data);
    };

    return {
        connect: connect,
        publish: publish
    };
})();

export default PubSubSocketManager;
