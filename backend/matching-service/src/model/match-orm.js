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
        return await MatchModel.find({});
    },
    
    findMatchByDifficulty: async (difficulty) => {
        return await MatchModel.find({difficulty: difficulty}).sort({date: 1});
    },
    
    removeMatchById: async (id) => {
        MatchModel.findByIdAndDelete(id, (err) => {
            if (err) {
                console.log(err);
                return;
            } 
            console.log(`Match id ${id} removed`);
        });
    },
}

export default MatchORM;
