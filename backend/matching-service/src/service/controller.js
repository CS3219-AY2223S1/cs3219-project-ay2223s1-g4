import MatchORM from '../model/match-orm.js';
import Authenticator from '../auth/auth.js';
import { attemptToMatch } from './matcher.js';

let MatchController = {
    createMatchEntry: async (req, res) => {
        const userid = Authenticator.extractUserSub(req);

        let diff = req.body.difficulty.toUpperCase();
        let match = await MatchORM.createMatch(userid, diff);
        console.log("\nMatch List:\n" + await MatchORM.getAllMatches());
        // TODO check logic if already exist/in room
        
        console.log("\x1b[32m%s\x1b[0m", `Match ${match._id} for ${match.difficulty} created`);
        setTimeout(() => attemptToMatch(diff), 0.1 * 1000);
        setTimeout(() => {
            async function cleanMatchIfNotPaired() {
                const matchExist = await MatchORM.checkMatchExist(match._id);
                if (matchExist) {
                    console.log("\x1b[33m%s\x1b[0m", `Match ${match._id} timed out`);
                    MatchORM.removeMatchById(match._id);
                }
            }
            cleanMatchIfNotPaired();
        }, 30 * 1000);
    
        return res.status(200).json({
            matchId: match._id
        });
    },
}

export default MatchController;
