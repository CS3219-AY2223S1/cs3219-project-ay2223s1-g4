import { ROOM_CREATE_TAG } from '../configs/config.js';
import MatchORM from '../model/match-orm.js';
import PubSubSocketManager from '../sockets/pubsub-socket.js';

async function attemptToMatch(difficulty) {
    let existingMatches = await MatchORM.findMatchByDifficulty(difficulty);
    console.log(`Found ${existingMatches} for ${difficulty}`);
    let matchFound = false;
    if (existingMatches.length >= 2) {
        matchFound = true;
        PubSubSocketManager.publish(ROOM_CREATE_TAG, {
            userid1: existingMatches[0].userid,
            userid2: existingMatches[1].userid,
            difficulty: difficulty
        });
    }
    return matchFound;
}

export { attemptToMatch };
