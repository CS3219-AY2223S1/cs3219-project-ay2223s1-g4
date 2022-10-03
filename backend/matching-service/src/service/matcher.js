import { ROOM_CREATE_TAG } from '../configs/config.js';
import MatchORM from '../model/match-orm.js';
import PubSubSocketManager from '../sockets/pubsub-socket.js';

async function attemptToMatch(difficulty) {
    let existingMatches = await MatchORM.findMatchByDifficulty(difficulty); // sort by time!
    console.log(`Found ${existingMatches} for ${difficulty}`);
    if (existingMatches.length >= 2) {
        PubSubSocketManager.publish(ROOM_CREATE_TAG, {
            userid1: existingMatches[0].userid,
            userid2: existingMatches[1].userid,
            difficulty: difficulty
        });
        // remove current match instances to prevent double matching!
        // but it affects match-socket logic!
    }
}

export { attemptToMatch };
