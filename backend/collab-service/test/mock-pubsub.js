import PubSubSocketManager from "../src/sockets/pubsub-socket.js";
import { Server } from 'socket.io';
import express from 'express';

function createMockPubSub(mockPubSubPort) {
    const mockPubSubURI = `http://localhost:${mockPubSubPort}`;
    let server = express().listen(mockPubSubPort, () => {
        console.log(`mock-server listening on port ${mockPubSubPort}`);
    });

    let pubsub = new Server(server, {
        cors: { origin: '*' }
    });
    pubsub.on('connection', (socket) => {
        console.log(`local-server ${socket.id} connected to mock-server`);
        socket.on('publish', (event, _, args) => {
            console.log(`Event published by ${socket.id} to topic '${event}' | ${JSON.stringify(args)}`);
            pubsub.to(event).emit(event, args);
        });
        socket.on('subscribe', (room) => {
            socket.join(room);
            console.log(`Socket id ${socket.id} subscribed to '${room}'`);
        });
        socket.on('disconnecting', () => {
            console.log(`Socket id ${socket.id} has left`)
        })
    });

    PubSubSocketManager.connect(mockPubSubURI);
    return pubsub;
}

export { createMockPubSub };
