import SessionModel from './session-model.js';

let SessionORM = {
    createSession: async (roomid) => {
        const session = new SessionModel({ roomid: roomid });
        session.save();
        return session;
    },

    findSessionByRoomId: async (roomid) => {
        return await SessionModel.findOne({ roomid: roomid });
    },

    closeSessionByRoomId: async (roomid) => {
        return await SessionModel.findOneAndUpdate({ roomid: roomid }, {
            isOpen: false
        });
    },

    updateDocumentFromRoomId: async (roomid, document) => {
        if (!(await SessionModel.findOne({ roomid: roomid })).isOpen) {
            console.warn(`Room ${roomid} is already closed, unable to update document`);
            return;
        }
        return await SessionModel.findOneAndUpdate({ roomid: roomid }, {
            document: document
        });
    },
}

export default SessionORM;
