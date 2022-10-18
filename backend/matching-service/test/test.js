import chai from 'chai';
import chaiHttp from 'chai-http';
import httpServer from '../src/index.js';
import MatchORM from '../src/model/match-orm.js';

// Configure chai
chai.use(chaiHttp);
chai.should();
const expect = chai.expect;

let match1_id, match2_id, match3_id, match4_id, match5_id, match6_id, match7_id, match8_id, match9_id = null;

describe("Testing Matching Service", () => {
    it("Create match1 + match1 should be removed within 3 seconds after the 30 seconds timeout", async() => {
        chai.request(httpServer)
            .post('/api/match')
            .send({
                "difficulty": "EASY",
                "user": {
                    "sub": "auth0|123456789012345678901"
                }
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
            .send({
                "difficulty": "EASY",
                "user": {
                    "sub": "auth0|234567890123456789012"
                }
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('matchId');
                match2_id = res.body.matchId;
            });
        
        chai.request(httpServer)
            .post('/api/match')
            .send({
                "difficulty": "EASY",
                "user": {
                    "sub": "auth0|345678901234567890123"
                }
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
        }
        )
    });
    
    it("Create match4 and match5 (of different difficulty) + match4 and match5 should time out", async () => {
        chai.request(httpServer)
            .post('/api/match')
            .send({
                "difficulty": "EASY",
                "user": {
                    "sub": "auth0|456789012345678901234"
                }
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('matchId');
                match4_id = res.body.matchId;
            });
        
        chai.request(httpServer)
            .post('/api/match')
            .send({
                "difficulty": "MEDIUM",
                "user": {
                    "sub": "auth0|567890123456789012345"
                }
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

    it("Create match6 and match7 (of same difficulty & within 2 seconds from match6's timeout) + match6 and match7 should pair together", async () => {
        chai.request(httpServer)
            .post('/api/match')
            .send({
                "difficulty": "HARD",
                "user": {
                    "sub": "auth0|678901234567890123456"
                }
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('matchId');
                match6_id = res.body.matchId;
            });
        
        await new Promise(resolve => setTimeout(resolve, 27 * 1000));

        chai.request(httpServer)
            .post('/api/match')
            .send({
                "difficulty": "HARD",
                "user": {
                    "sub": "auth0|789012345678901234567"
                }
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('matchId');
                match7_id = res.body.matchId;
            }
        );

        await new Promise(resolve => setTimeout(resolve, 3 * 1000));
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
            .send({
                "difficulty": "EASY",
                "user": {
                    "sub": "auth0|890123456789012345678"
                }
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
            .send({
                "difficulty": "EASY",
                "user": {
                    "sub": "auth0|901234567890123456789"
                }
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
});
