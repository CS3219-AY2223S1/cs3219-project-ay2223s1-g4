import CollabModel from './collab-model.js';

let CollabORM = {
    createSession: async (roomid) => {
        const session = new CollabModel({ roomid: roomid });
        session.save();
        return session;
    },

    findSessionByRoomId: async (roomid) => {
        return await CollabModel.findOne({ roomid: roomid });
    },

    closeSessionByRoomId: async (roomid) => {
        return await CollabModel.findOneAndUpdate({ roomid: roomid }, {
            isOpen: false
        });
    },

    updateDocumentFromRoomId: async (roomid, document) => {
        if (!(await CollabModel.findOne({ roomid: roomid })).isOpen) {
            console.warn(`Room ${roomid} is already closed, unable to update document`);
            return;
        }
        return await CollabModel.findOneAndUpdate({ roomid: roomid }, {
            document: document
        });
    },
}

export default CollabORM;
