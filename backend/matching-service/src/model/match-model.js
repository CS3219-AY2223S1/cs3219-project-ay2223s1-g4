import mongoose from 'mongoose';

let MatchModelSchema = new mongoose.Schema({
    userid: {
        type: String,
        required: true,
        // unique: true,
    },
    difficulty: {
        type: String,
        enum : ["EASY", "MEDIUM", "HARD"],
        required: true,
    },
});

const MatchModel = mongoose.model('Match', MatchModelSchema);

export default MatchModel;
