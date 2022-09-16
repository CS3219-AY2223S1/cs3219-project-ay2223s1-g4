import mongoose from 'mongoose';

let RoomModelSchema = new mongoose.Schema({
    userid1: {
        type: String,
        required: true,
        unique: true,
    },
    userid2: {
        type: String,
        required: true,
        unique: true,
    },
    questionid: {
        type: Number,
        required: true,
    },
});

export default mongoose.model('Room', RoomModelSchema);
