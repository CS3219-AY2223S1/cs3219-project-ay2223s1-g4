import mongoose from 'mongoose';

const CollabModelSchema = new mongoose.Schema({
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
});

const CollabModel = mongoose.model('Collab', CollabModelSchema);

export default CollabModel;
