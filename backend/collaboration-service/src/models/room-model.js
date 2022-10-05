import mongoose from 'mongoose';

const RoomModelSchema = new mongoose.Schema({
    userid1: {
        type: String,
        required: true,
    },
    userid2: {
        type: String,
        required: true,
    },
    questionid: {
        type: Number,
        required: true,
    },
    document: {
        type: String,
        default: ''
    },
    isOpen: {
        type: Boolean,
        default: true
    },
});

const RoomModel = mongoose.model('Room', RoomModelSchema);

export default RoomModel;
