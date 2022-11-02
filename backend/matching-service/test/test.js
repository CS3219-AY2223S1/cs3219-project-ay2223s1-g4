import * as sinon from 'sinon';
import Authenticator from "../src/auth/auth.js";
import chai from 'chai';
import chaiHttp from 'chai-http';
import httpServer from '../src/index.js';
import mongoose from 'mongoose';
import MatchORM from '../src/model/match-orm.js';
import { createMockPubSub } from "./mock-pubsub.js";
import { io as Client } from "socket.io-client";
import { ROOM_CREATE_TAG, ROOM_CREATED_TAG } from '../src/configs/config.js';

// Configure chai
chai.use(chaiHttp);
chai.should();
const expect = chai.expect;

// Mock authentication
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

// Mock ids
let match1_id, match2_id, match3_id, match4_id, match5_id, match6_id, match7_id, match8_id, match9_id = null;

describe("Testing Matching Service", () => {
    let pubsub;
    let client;

    before((done) => {
        let mockPubSubPort = 1234;
        pubsub = createMockPubSub(mockPubSubPort);
        client = new Client(`http://localhost:${mockPubSubPort}`);
        client.emit('subscribe', ROOM_CREATE_TAG);

        client.on(ROOM_CREATE_TAG, async (pairing) => {
            console.log(`Got pairing ${pairing} to manage`)
            let data = {
                userId1: pairing.userid1,
                userId2: pairing.userid2,
                roomId: new mongoose.Types.ObjectId()
            }
            client.emit('publish', ROOM_CREATED_TAG, null, data);
        });
        setTimeout(() => done(), 3 * 1000);
    });

    it("Create match1 + match1 should be removed within 3 seconds after the 30 seconds timeout", async () => {
        chai.request(httpServer)
            .post('/api/match')
            .set({'authorization': "auth0|123456789012345678901"})
            .send({
                "difficulty": "EASY"
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('matchId');
                match1_id = res.body.matchId;
            });
        
        await new Promise(resolve => setTimeout(resolve, 33 * 1000));
        await MatchORM.checkMatchExist(match1_id).then((result) => {
            expect(result).to.be.false;
        });
    });

    it("Create match2 and match3 (of same difficulty) + match2 and match3 should pair together within 3 seconds", async () => {
        chai.request(httpServer)
            .post('/api/match')
            .set({'authorization': "auth0|234567890123456789012"})
            .send({
                "difficulty": "EASY"
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('matchId');
                match2_id = res.body.matchId;
            });
        
        chai.request(httpServer)
            .post('/api/match')
            .set({'authorization': "auth0|345678901234567890123"})
            .send({
                "difficulty": "EASY"
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('matchId');
                match3_id = res.body.matchId;
            }
        );

        await new Promise(resolve => setTimeout(resolve, 3 * 1000));
        await MatchORM.checkMatchExist(match2_id).then((result) => {
            expect(result).to.be.false;
        });
        await MatchORM.checkMatchExist(match3_id).then((result) => {
            expect(result).to.be.false;
        });
    });
    
    it("Create match4 and match5 (of different difficulty) + match4 and match5 should time out", async () => {
        chai.request(httpServer)
            .post('/api/match')
            .set({'authorization': "auth0|456789012345678901234"})
            .send({
                "difficulty": "EASY"
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('matchId');
                match4_id = res.body.matchId;
            });
        
        chai.request(httpServer)
            .post('/api/match')
            .set({'authorization': "auth0|567890123456789012345"})
            .send({
                "difficulty": "MEDIUM"
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('matchId');
                match5_id = res.body.matchId;
            }
        );

        await new Promise(resolve => setTimeout(resolve, 27 * 1000));
        await MatchORM.checkMatchExist(match4_id).then((result) => {
            expect(result).to.be.true;
        });
        await MatchORM.checkMatchExist(match5_id).then((result) => {
            expect(result).to.be.true;
        });

        await new Promise(resolve => setTimeout(resolve, 5 * 1000));
        await MatchORM.checkMatchExist(match4_id).then((result) => {
            expect(result).to.be.false;
        });
        await MatchORM.checkMatchExist(match5_id).then((result) => {
            expect(result).to.be.false;
        });
    });

    it("Create match6 and match7 (of same difficulty & within 3 seconds from match6's timeout) + match6 and match7 should pair together", async () => {
        chai.request(httpServer)
            .post('/api/match')
            .set({'authorization': "auth0|678901234567890123456"})
            .send({
                "difficulty": "HARD"
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('matchId');
                match6_id = res.body.matchId;
            });
        
        await new Promise(resolve => setTimeout(resolve, 26 * 1000)); // slightly under

        chai.request(httpServer)
            .post('/api/match')
            .set({'authorization': "auth0|789012345678901234567"})
            .send({
                "difficulty": "HARD"
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('matchId');
                match7_id = res.body.matchId;
            }
        );

        await new Promise(resolve => setTimeout(resolve, 3 * 1000)); // slightly under
        await MatchORM.checkMatchExist(match6_id).then((result) => {
            expect(result).to.be.false;
        });
        await MatchORM.checkMatchExist(match7_id).then((result) => {
            expect(result).to.be.false;
        });
    });

    it("Create match8 and match9 (of same difficulty & after match8's timeout) + match8 and match9 should not be paired together", async () => {
        chai.request(httpServer)
            .post('/api/match')
            .set({'authorization': "auth0|890123456789012345678"})
            .send({
                "difficulty": "EASY"
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('matchId');
                match8_id = res.body.matchId;
            });
        
        await new Promise(resolve => setTimeout(resolve, 27 * 1000));
        await MatchORM.checkMatchExist(match8_id).then((result) => {
            expect(result).to.be.true;
        });
        await new Promise(resolve => setTimeout(resolve, 5 * 1000));
        await MatchORM.checkMatchExist(match8_id).then((result) => {
            expect(result).to.be.false;
        });

        chai.request(httpServer)
            .post('/api/match')
            .set({'authorization': "auth0|901234567890123456789"})
            .send({
                "difficulty": "EASY"
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('matchId');
                match9_id = res.body.matchId;
            }
        );

        await new Promise(resolve => setTimeout(resolve, 27 * 1000));
        await MatchORM.checkMatchExist(match9_id).then((result) => {
            expect(result).to.be.true;
        });
        await new Promise(resolve => setTimeout(resolve, 5 * 1000));
        await MatchORM.checkMatchExist(match9_id).then((result) => {
            expect(result).to.be.false;
        });
    });

    it("Should support up to 1000 sessions", async () => {
        for (let i = 0; i < 2000; i++) {
            chai.request(httpServer)
                .post('/api/match')
                .set({'authorization': `auth0|${Math.floor(Math.random() * 9000000000000000) + 1000000000000000}`})
                .send({
                    "difficulty": "EASY"
                })
        }
        await new Promise(resolve => setTimeout(resolve, 40 * 1000));
        await MatchORM.getMatchesCount().then((result) => {
            expect(result).to.be.equal(0);
        });
    });
});
