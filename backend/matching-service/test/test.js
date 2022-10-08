import chai from 'chai';
import chaiHttp from 'chai-http';
import httpServer from '../src/index.js';
import { attemptToMatch } from '../src/service/matcher.js';

// Configure chai
chai.use(chaiHttp);
chai.should();

describe("Matching", () => {
    it("Should create match 1", (done) => {
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
                done();
            });
    });
    
    it("Should create match 2", (done) => {
        chai.request(httpServer)
            .post('/api/match')
            .send({
                "difficulty": "EASY",
                "user": {
                    "sub": "auth0|987654321098765432109"
                }
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('matchId');
                done();
            });
    });

    it("Should create match 3", (done) => {
        chai.request(httpServer)
            .post('/api/match')
            .send({
                "difficulty": "MEDIUM",
                "user": {
                    "sub": "auth0|234567890123456789012"
                }
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('matchId');
                done();
            });
    });

    it("Should create match 4", (done) => {
        chai.request(httpServer)
            .post('/api/match')
            .send({
                "difficulty": "HARD",
                "user": {
                    "sub": "auth0|876543210987654321098"
                }
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('matchId');
                done();
            });
    });

    it("Should find a match with match 1 and match 2", (done) => {
        setTimeout(() => {
            console.log(
                attemptToMatch('EASY').then((found) => {
                    found.should.be.a('boolean');
                    found.should.be.true;
                }
            ));
        done();
        }, 0.5 * 1000);
    });

    it("Should not find a match for match 3", (done) => {
        setTimeout(() => {
            console.log(
                attemptToMatch('MEDIUM').then((found) => {
                    found.should.be.a('boolean');
                    found.should.be.false;
                }
            ));
            done();
        }, 30 * 1000);
    });

    it("Should create match 5", (done) => {
        chai.request(httpServer)
            .post('/api/match')
            .send({
                "difficulty": "HARD",
                "user": {
                    "sub": "auth0|345678901234567890123"
                }
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('matchId');
                done();
            });
    });

    it("Should create match 6 and pair it with match 5 within the last second", (done) => {
        chai.request(httpServer)
            .post('/api/match')
            .send({
                "difficulty": "HARD",
                "user": {
                    "sub": "auth0|765432109876543210987"
                }
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('matchId');
                setTimeout(() => {
                    console.log(
                        attemptToMatch('HARD').then((found) => {
                            found.should.be.a('boolean');
                            found.should.be.false;
                        })
                    )
                    done();
                }, 29 * 1000);
            });
    });
});
