import { createMatch, removeMatchById, findMatchByDifficulty, getAllMatches } from './repository.js';

export async function ormCreateMatch(userid, difficulty) {
    try {
        const newMatch = await createMatch({ userid, difficulty });
        newMatch.save();
        return newMatch;

    } catch (err) {
        console.log('ERROR: Could not create new match');
        return { err };
    }
};

export async function ormGetMatches() {
    try {
        return await getAllMatches();

    } catch (err) {
        console.log('ERROR: Could not create new match');
        return { err };
    }
};

export async function ormRemoveMatchById(matchId) {
    try {
        await removeMatchById(matchId);
        return true;

    } catch (err) {
        console.log(`ERROR: Could not remove match ${matchId}`);
        return { err };
    }
};

export async function ormFindMatchByDifficulty(difficulty) {
    try {
        let matches = await findMatchByDifficulty(difficulty);
        return (!matches) 
            ? []
            : matches;

    } catch (err) {
        console.log(`ERROR: Could not find matches with difficulty ${difficulty}`);
        return { err };
    }
};
