import SessionORM from '../models/session-orm.js';

async function getDocumentGivenRoomId(roomId) {
    let output = (await SessionORM.findSessionByRoomId(roomId));
    return output.document;
};

async function updateDocumentFromRoomId(roomId, document) {
    try {
        return await SessionORM.updateDocumentFromRoomId(roomId, document);
    } catch (err) {
        console.warn(err.message);
    }
};

async function createSessionFromRoomId(roomId) {
    try {
        await SessionORM.createSession(roomId);
    } catch (err) {
        console.warn(err.message);
    }
};

export { getDocumentGivenRoomId, updateDocumentFromRoomId, createSessionFromRoomId };
