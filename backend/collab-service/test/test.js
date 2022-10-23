import httpServer from "../src/index.js";
import { createMockPubSub } from "./mock-pubsub.js";
import { io as Client } from "socket.io-client";
import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';
import SessionORM from "../src/models/session-orm.js";
import { ROOM_CREATED_TAG } from "../src/configs/config.js";

chai.use(chaiHttp);
chai.should();
const expect = chai.expect;

async function createMockSession() {
    return await SessionORM.createSession(new mongoose.Types.ObjectId());
}

describe('GET api/session/room/:room_id', () => {
    let mockSession = null;

    before((done) => {
        // buffer for mongodb connection
        setTimeout(() => done(), 5 * 1000);
    });

    it("should give 404", (done) => {
        const mockRoomId = new mongoose.Types.ObjectId();

        chai.request(httpServer)
            .get(`api/session/room/${mockRoomId}`)
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    })

    it("should give session", (done) => {
        createMockSession().then((session) => {
            mockSession = session;
            console.log(`New session id ${mockSession._id} created`);

            chai.request(app)
                .get(`api/session/room/${mockSession._id}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    assert(mockSession, res.body);
                    done();
                });
        });
    })

    after(async (done) => {
        if (mockSession != null) {
            console.log(`Cleaning session ${mockSession._id}`);
            await SessionModel.findByIdAndDelete(mockSession._id);
        }
        done();
    });
});

describe('PUT api/session/room/:room_id', () => {
    let mockSession = null;

    it("should give 404", (done) => {
        done();
    })

    it("should give session", (done) => {
        done();
    })

    after(async (done) => {
        if (mockSession != null) {
            console.log(`Cleaning session ${mockSession._id}`);
            await SessionModel.findByIdAndDelete(mockSession._id);
        }
        done();
    });
});

describe('socket services', () => {
    let pubsub;
    let mockPubSubPort = 1234;
    let mockRoom = {
        __v: 0,
        _id: new mongoose.Types.ObjectId(),
        userid1: new mongoose.Types.ObjectId(),
        userid2: new mongoose.Types.ObjectId(),
        questionid: 10
    };

    before((done) => {
        pubsub = createMockPubSub(mockPubSubPort);
        setTimeout(() => done(), 3 * 1000);
    });

    it('should receive and create', (done) => {
        console.log(`Sending ${JSON.stringify(mockRoom)} to pubsub`);
        pubsub.to(ROOM_CREATED_TAG).emit(ROOM_CREATED_TAG, mockRoom);

        setTimeout(() => {
            // check if session document is created
            done();
        }, 1 * 1000);
    });

    it('should allow communication', (done) => {
        let clientA = new Client(`http://localhost:${mockPubSubPort}`);
        let clientB = new Client(`http://localhost:${mockPubSubPort}`);
        // create 2 clients
        // check if connected
        // check if can cross comms
        // check if can close
        // check if auto terminates
        done();
    });
});
