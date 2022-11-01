import * as sinon from 'sinon';
import Authenticator from "../src/auth/auth.js";
import HttpStatus from 'http-status-codes';
import RoomORM from "../src/models/room-orm.js";
import RoomModel from "../src/models/room-model.js";
import { createMockPubSub } from "./mock-pubsub.js";
import { ROOM_CREATED_TAG, ROOM_CREATE_TAG } from "../src/configs/config.js";
import { io as Client } from "socket.io-client";
import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';
import app from '../src/index.js';

chai.use(chaiHttp);
chai.should();
const expect = chai.expect;

// mock authentication
sinon.stub(Authenticator, 'checkJwt').callsFake(async (req, res, next) => {
    console.log('Mocked checkJwt called');
    next();
});
sinon.stub(Authenticator, 'extractUserSub').callsFake((req) => {
    console.log('Mocked extractUserSub called');
    return req.headers.authorization;
});

// mock room creation
async function createMockRoom(id1, id2) {
    return await RoomORM.createRoom(id1, id2, 0);
}

// mock user ids
const userId1 = '1234567890';
const userId2 = 'abcdef1234';
const userId3 = '1122334455';


describe('GET api/room/:room_id', () => {
    let newRoom = null;

    before((done) => {
        // buffer for mongodb connection
        setTimeout(() => done(), 5 * 1000);
    });

    it("should give not found 404", (done) => {
        const mockObjectId = new mongoose.Types.ObjectId();
        chai.request(app)
            .get(`/api/room/${mockObjectId}`)
            .set({'authorization': userId1})
            .end((err, res) => {
                res.should.have.status(HttpStatus.NOT_FOUND);
                done();
            });
    });

    it("should give room 200", (done) => {
        createMockRoom(userId1, userId2).then((room) => {
            newRoom = room;
            console.log(`New room id ${newRoom._id} created`);

            chai.request(app)
                .get(`/api/room/${newRoom._id}`)
                .set({'authorization': userId1})
                .end((err, res) => {
                    res.should.have.status(HttpStatus.OK);
                    res.body.should.be.a('object');
                    assert(newRoom, res.body.data);
                    done();
                });
        });
    });

    it("should give unauthorised 401", (done) => {
        chai.request(app)
            .get(`/api/room/${newRoom._id}`)
            .set({'authorization': userId3})
            .end((err, res) => {
                res.should.have.status(HttpStatus.UNAUTHORIZED);
                done();
            });
    });

    after((done) => {
        if (newRoom != null) {
            console.log(`Cleaning room ${newRoom._id}`);
            RoomORM.removeRoomById(newRoom._id);
        }
        done();
    });
});

describe('GET api/room/user/:user_id', () => {
    let newRoomA = null;
    let newRoomB = null;
    
    it("should give empty list", (done) => {
        chai.request(app)
            .get(`/api/room/user/${userId1}`)
            .set({'authorization': userId1})
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array').that.is.empty;
                done();
            });
    });

    it("should give room", (done) => {
        createMockRoom(userId1, userId2).then((room1) => {
            newRoomA = room1;
            console.log(`New room id ${newRoomA._id} created`);

            createMockRoom(userId2, userId1).then((room2) => {
                newRoomB = room2;
                console.log(`New room id ${newRoomB._id} created`);

                chai.request(app)
                    .get(`/api/room/user/${userId2}`)
                    .set({'authorization': userId2})
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('array');
                        console.log(`Got body ${JSON.stringify(res.body)}`);
                        expect(res.body).to.have.deep.members([
                            JSON.parse(JSON.stringify(newRoomA)),
                            JSON.parse(JSON.stringify(newRoomB))
                        ]);
                        done();
                    });
            });
        });
    });

    after((done) => {
        if (newRoomA != null) {
            console.log(`Cleaning room ${newRoomA._id}`);
            RoomORM.removeRoomById(newRoomA._id);
        }
        if (newRoomB != null) {
            console.log(`Cleaning room ${newRoomB._id}`);
            RoomORM.removeRoomById(newRoomB._id);
        }
        done();
    });
});

describe('pubsub logic', () => {
    let pubsub;
    let client;

    before((done) => {
        let mockPubSubPort = 1234;
        pubsub = createMockPubSub(mockPubSubPort);
        client = new Client(`http://localhost:${mockPubSubPort}`);
        setTimeout(() => done(), 3 * 1000);
    });

    it('should receive, create and publish', (done) => {
        client.emit('subscribe', ROOM_CREATED_TAG);
        client.on(ROOM_CREATED_TAG, async (room) => {
            console.log(`Received room ${JSON.stringify(room)}`);
            assert(roomReq.userid1, room.userId1);
            assert(roomReq.userid2, room.userId2);
            assert(true, await RoomModel.exists({_id: room._id}));
            done();
        })

        const roomReq = {
            userid1: new mongoose.Types.ObjectId(),
            userid2: new mongoose.Types.ObjectId(),
            difficulty: 'EASY'
        };
        console.log(`Sending ${JSON.stringify(roomReq)} to pubsub`);
        pubsub.to(ROOM_CREATE_TAG).emit(ROOM_CREATE_TAG, roomReq);
    });
});
