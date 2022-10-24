import SessionModel from './session-model.js';

let SessionORM = {
    createSession: async (roomId) => {
        const session = new SessionModel({ roomid: roomId });
        session.save();
        return session;
    },

    findSessionByRoomId: async (roomId) => {
        console.log(`Finding session with room id ${roomId}`);
        return SessionModel.findOne({ roomid: roomId })
            .then((doc) => {
                return doc;
            })
            .catch((err) => {
                console.log(err);
                return null;
            });
    },

    closeSessionByRoomId: async (roomId) => {
        const search = { roomid: roomId };
        const update = { isOpen: false };
        return SessionModel.findOneAndUpdate(search, update, { new : true })
            .then((doc) => {
                return doc;
            })
            .catch((err) => {
                console.log(err.message);
                return null;
            });
    },

    updateDocumentFromRoomId: async (roomId, document) => {
        let session = await SessionModel.findOne({ roomid: roomId })
            .then((doc) => {
                return doc;
            })
            .catch((err) => {
                console.log(err);
                return null;
            });
        if (session == null) {
            console.warn(`Room ${roomId} does not exist`);
            return;
        }
        if (!(session.isOpen)) {
            console.warn(`Room ${roomId} is already closed, unable to update document`);
            return;
        }
        return await SessionModel.findOneAndUpdate({ roomid: roomId }, {
            document: document
        });
    },
}

export default SessionORM;
