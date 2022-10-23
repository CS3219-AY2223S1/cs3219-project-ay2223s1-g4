import SessionModel from './session-model.js';

let SessionORM = {
    createSession: async (roomid) => {
        const session = new SessionModel({ roomid: roomid });
        session.save();
        return session;
    },

    findSessionByRoomId: async (roomid) => {
        return SessionModel.findOne({ roomid: roomid })
            .then((doc) => {
                return doc;
            })
            .catch((err) => {
                console.log(err.message);
                return null;
            });;
    },

    closeSessionByRoomId: async (roomid) => {
        return await SessionModel.findOneAndUpdate({ roomid: roomid }, {
            isOpen: false
        });
    },

    updateDocumentFromRoomId: async (roomid, document) => {
        let session = findSessionByRoomId(roomid);
        if (session == null) {
            console.warn(`Room ${roomid} does not exist`);
            return;
        }
        if (!(session.isOpen)) {
            console.warn(`Room ${roomid} is already closed, unable to update document`);
            return;
        }
        return await SessionModel.findOneAndUpdate({ roomid: roomid }, {
            document: document
        });
    },
}

export default SessionORM;
