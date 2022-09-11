import { MatchingModelSchema, matchingRepository } from './matching-model.js';

export async function ormCreateMatch(userId, difficulty) {
    try {
        await matchingRepository.sync({ alter: true });
        const newMatch = MatchingModelSchema.build({ userId: userId, setDifficulty: difficulty });
        await newMatch.save();
        console.log(`${newMatch} created`);
        return true;

    } catch (err) {
        console.log('ERROR: Could not create new match entry');
        return { err };
    }
};

export async function ormDeleteMatch(matchId) {
    try {
        const deletedResult = await MatchingModelSchema.destroy({
            where: { id: matchId, }
        });
        console.log(`${matchId} created with output ${deletedResult}`);
        return true;

    } catch (err) {
        console.log(`ERROR: Could not delete match ${matchId}`);
        return { err };
    }
};

export async function ormFindByUserId(userId) {
    try {
        const match = MatchingModelSchema.findOne({ userId: userId });
        return match;

    } catch (err) {
        console.log(`ERROR: Could not find new match entry of user ${userId}`);
        return { err };
    }
};

export async function ormFindByMatchId(matchId) {
    try {
        const match = MatchingModelSchema.findByPk(matchId);
        return match;

    } catch (err) {
        console.log(`ERROR: Could not find new match entry ${matchId}`);
        return { err };
    }
};

export async function ormIndex() {
    try {
        return MatchingModelSchema.findAll();

    } catch (err) {
        console.log('ERROR: Could not load matches');
        return { err };
    }
};
