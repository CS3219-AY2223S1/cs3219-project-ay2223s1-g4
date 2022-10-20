import MatchModel from "./match-model.js";

let MatchORM = {
    createMatch: async (userid, difficulty) => {
        const newMatch = new MatchModel({ 
            userid: userid,
            difficulty: difficulty
        });
        newMatch.save();
        return newMatch;
    },
    
    getAllMatches: async () => {
        return await MatchModel.find({}).sort({_id: 1});
    },

    getMatchesCount: async () => {
        return await MatchModel.countDocuments();
    },
    
    findMatchByDifficulty: async (difficulty) => {
        return await MatchModel.find({difficulty: difficulty}).sort({_id: 1});
    },
    
    removeMatchById: async (id) => {
        MatchModel.findByIdAndDelete(id, (err) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log("\x1b[31m%s\x1b[0m", `\tMatch id ${id} removed`);
        });
    },

    checkMatchExist: async (id) => {
        const matchExist = await MatchModel.exists({ _id: id }).then((result) => {
            return result;
        }) !== null;
        return matchExist;
    }
}

export default MatchORM;
