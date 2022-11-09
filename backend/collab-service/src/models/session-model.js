import mongoose from 'mongoose';

const SessionModelSchema = new mongoose.Schema({
    roomid: {
        type: String,
        required: true,
        unique: true
    },
    document: {
        type: String,
        default: ''
    },
    isOpen: {
        type: Boolean,
        default: true
    },
}, { timestamps: true });

const SessionModel = mongoose.model('Session', SessionModelSchema);

export default SessionModel;
