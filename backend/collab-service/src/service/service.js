import CollabORM from '../models/collab-orm.js';

async function getDocumentGivenId(roomId) {
    let output = (await CollabORM.findSessionByRoomId(roomId));
    return output.document;
};

async function updateDocumentFromRoomId(roomId, document) {
    try {
        return await CollabORM.updateDocumentFromRoomId(roomId, document);
    } catch (err) {
        console.warn(err.message);
    }
};

async function createSessionFromRoomId(roomId) {
    try {
        await CollabORM.createSession(roomId);
    } catch (err) {
        console.warn(err.message);
    }
};

export { getDocumentGivenId, updateDocumentFromRoomId, createSessionFromRoomId };
