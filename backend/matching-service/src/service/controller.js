import MatchORM from '../model/match-orm.js';
import { attemptToMatch } from './matcher.js';

let MatchController = {
    getMatches: async (req, res) => {
        let matches = await MatchORM.getAllMatches();
        return res.status(200).json({
            matches: matches
        });
    },
    
    createMatchEntry: async (req, res) => {
        let diff = req.body.difficulty.toUpperCase();
        let userid = req.body.user.sub;
        let match = await MatchORM.createMatch(userid, diff);
        console.log(await MatchORM.getAllMatches());
        // TODO check logic if already exist/in room
        
        console.log(`Match ${match._id} for ${match.difficulty} created`);
        setTimeout(() => attemptToMatch(diff), 0.1 * 1000);
        setTimeout(() => {
            console.log(`Cleaning up match with userid ${match._id}`);
            MatchORM.removeMatchById(match._id);
        }, 30 * 1000);
    
        return res.status(200).json({
            matchId: match._id
        });
    },
}

export default MatchController;
