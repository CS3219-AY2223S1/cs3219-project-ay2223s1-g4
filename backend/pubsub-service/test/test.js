import "../src/index.js";
import { PORT } from "../src/configs/config.js";
import { io as Client } from "socket.io-client";
import { assert } from "chai";

describe("pubsub test", () => {

    it("allows clients to connect", (done) => {
        let client = new Client(`http://localhost:${PORT}`);
        client.on("connect", () => {
            assert.equal(client.connected, true);
            client.close();
            setTimeout(() => done(), 1000);
        });
    });

    it("is able to pubsub", (done) => {
        let clientA = new Client(`http://localhost:${PORT}`);
        let clientB = new Client(`http://localhost:${PORT}`);
        let room = 'room';
        let payload = 'test me';
        clientA.on("connect", () => {
            clientA.on(room, (data) => {
                assert(data, payload);
                clientA.close();
                clientB.close();
                setTimeout(() => done(), 1000);
            });
            clientA.emit('subscribe', room);
        });
        clientB.on("connect", () => {
            clientB.emit("publish", room, null, payload);
        });
    });

    it("is able to pubsub to correct room", (done) => {
        let clientA = new Client(`http://localhost:${PORT}`);
        let clientB = new Client(`http://localhost:${PORT}`);
        let clientC = new Client(`http://localhost:${PORT}`);
        let room = 'another-room';
        let payload = 'test me again';
        clientA.on("connect", () => {
            clientA.emit('subscribe', room);
            clientA.on(room, (data) => {
                assert(data, payload);
                clientA.close();
                clientB.close();
                clientC.close();
                setTimeout(() => done(), 1000);
            });

            clientC.on("connect", () => {
                clientC.emit('subscribe', 'other-room');
                clientC.on(room, (data) => {
                    throw new Error("unsubscibed client should not receive");
                });
            });
            clientB.on("connect", () => {
                clientB.emit("publish", room, null, payload);
            });
        });
    });
});
