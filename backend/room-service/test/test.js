import app from "../src/index.js";
import RoomORM from "../src/models/room-orm.js";
import RoomModel from "../src/models/room-model.js";
import { createMockPubSub } from "./mock-pubsub.js";
import { ROOM_CREATED_TAG, ROOM_CREATE_TAG } from "../src/configs/config.js";
import { io as Client } from "socket.io-client";
import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';

chai.use(chaiHttp);
chai.should();
const expect = chai.expect;

async function createMockRoom(id1, id2) {
    return await RoomORM.createRoom(id1, id2, 0);
}

describe('GET api/room/:room_id', () => {
    let newRoom = null;

    before((done) => {
        // buffer for mongodb connection
        setTimeout(() => done(), 5 * 1000);
    });

    it("should give 404", (done) => {
        const mockObjectId = new mongoose.Types.ObjectId();

        chai.request(app)
            .get(`/api/room/${mockObjectId}`)
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    });

    it("should give room", (done) => {
        createMockRoom('userid1', 'userid2').then((room) => {
            newRoom = room;
            console.log(`New room id ${newRoom._id} created`);

            chai.request(app)
                .get(`/api/room/${newRoom._id}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    assert(newRoom, res.body.data);
                    done();
                });
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

describe('GET api/user/:user_id', () => {
    let newRoomA = null;
    let newRoomB = null;
    
    it("should give empty list", (done) => {
        const mockObjectId = new mongoose.Types.ObjectId();
        chai.request(app)
            .get(`/api/room/user/${mockObjectId}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array').that.is.empty;
                done();
            });
    });

    it("should give room", (done) => {
        const fakeIdA = new mongoose.Types.ObjectId();
        const fakeIdB = new mongoose.Types.ObjectId();
        console.log(`Fake users ${fakeIdA} and ${fakeIdB}`);

        createMockRoom(fakeIdA, fakeIdB).then((room1) => {
            newRoomA = room1;
            console.log(`New room id ${newRoomA._id} created`);

            createMockRoom(fakeIdA, fakeIdB).then((room2) => {
                newRoomB = room2;
                console.log(`New room id ${newRoomB._id} created`);

                chai.request(app)
                    .get(`/api/room/user/${fakeIdA}`)
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
        done();
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
        setTimeout(() => {
            pubsub.to(ROOM_CREATE_TAG).emit(ROOM_CREATE_TAG, roomReq);
        }, 1 * 1000);
    });
});
