import * as sinon from 'sinon';
import Authenticator from "../src/auth/auth.js";
import CollabService from '../src/service/service.js';
import { createMockPubSub } from "./mock-pubsub.js";
import chai, { assert, should } from 'chai';
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';
import SessionORM from "../src/models/session-orm.js";
import SessionModel from "../src/models/session-model.js";
import { ROOM_CREATED_TAG } from "../src/configs/config.js";
import httpServer from "../src/index.js";

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
sinon.stub(Authenticator, 'extractToken').callsFake((req) => {
    console.log('Mocked extractToken called');
    return req.headers.authorization;
});

// mock verification
sinon.stub(CollabService, 'checkUserIsInSession').callsFake(async (roomId, userId, jwtToken) => {
    console.log('Mocked checkUserIsInSession called');
    return userId === jwtToken;
});

// mock session creation
async function createMockSession() {
    return await SessionORM.createSession(new mongoose.Types.ObjectId());
}

// mock user ids
const userId1 = '1234567890';
const userId2 = 'abcdef1234';
const userId3 = '1122334455';


describe('GET api/session/room/:room_id', () => {
    let mockSession = null;

    before((done) => {
        // buffer for mongodb connection
        setTimeout(() => done(), 5 * 1000);
    });

    it("should give 404", (done) => {
        const mockRoomId = new mongoose.Types.ObjectId();

        chai.request(httpServer)
            .get(`/api/session/room/${mockRoomId}`)
            .set({'authorization': userId1})
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    });

    it("should give session", (done) => {
        createMockSession().then((session) => {
            mockSession = session;
            console.log(`New session id ${mockSession._id} created`);
            chai.request(httpServer)
                .get(`/api/session/room/${mockSession.roomid}`)
                .set({'authorization': userId1})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    assert(mockSession, res.body);
                    done();
                });
        });
    });

    after((done) => {
        if (mockSession != null) {
            console.log(`Cleaning session ${mockSession._id}`);
            SessionModel.findByIdAndDelete(mockSession._id);
        }
        done();
    });
});

describe('PUT api/session/room/:room_id', () => {
    let mockSession = null;

    before((done) => {
        // buffer for mongodb connection
        setTimeout(() => done(), 1 * 1000);
    });

    it("should give 404", (done) => {
        const mockRoomId = new mongoose.Types.ObjectId();

        chai.request(httpServer)
            .put(`/api/session/room/${mockRoomId}`)
            .set({'authorization': userId1})
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    })

    it("should close session", (done) => {
        createMockSession().then((session) => {
            mockSession = session;
            expect(mockSession.isOpen).to.equal(true);
            console.log(`New session id ${mockSession._id} created`);
            chai.request(httpServer)
                .put(`/api/session/room/${mockSession.roomid}`)
                .set({'authorization': userId1})
                .end((err, res) => {
                    res.should.have.status(200);
                    SessionModel.findOne({ roomid: mockSession.roomid })
                        .then((doc) => {
                            expect(doc.isOpen).to.equal(false);
                            done();
                        })
                        .catch((err) => {
                            console.log(err);
                            should.fail();
                            done();
                        });
                });
        });
    })

    after(async (done) => {
        if (mockSession != null) {
            console.log(`Cleaning session ${mockSession._id}`);
            SessionModel.findByIdAndDelete(mockSession._id);
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
    let mockSession = null;

    before((done) => {
        pubsub = createMockPubSub(mockPubSubPort);
        setTimeout(() => done(), 2 * 1000);
    });

    it('should receive and create', (done) => {
        console.log(`Sending ${JSON.stringify(mockRoom)} to pubsub`);
        pubsub.to(ROOM_CREATED_TAG).emit(ROOM_CREATED_TAG, {
            roomId: mockRoom._id,
            userId1: mockRoom.userid1,
            userId2: mockRoom.userid2
        });
        setTimeout(async () => {
            console.log(`Caling SessionModel to verify creation`);
            mockSession = await SessionORM.findSessionByRoomId(mockRoom._id)
                .then((doc) => {
                    mockSession = doc;
                    console.log(`Found ${mockSession} as mock session`);
                    expect(mockSession.roomid).to.equal(mockRoom._id.toHexString());
                    expect(mockSession.document).to.equal('');
                    expect(mockSession.isOpen).to.equal(true);
                    done();
                })
                .catch((err) => {
                    console.log(err);
                    should.fail();
                    done();
                });
        }, 1 * 1000);
    });
    
    after((done) => {
        if (mockSession != null) {
            console.log(`Cleaning session ${mockSession._id}`);
            SessionModel.findByIdAndDelete(mockSession._id);
        }
        done();
    });
});
