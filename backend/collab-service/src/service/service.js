import SessionORM from '../models/session-orm.js';

async function getDocumentGivenRoomId(roomId) {
    console.log(`Getting document for room ${roomId}`)
    let output = (await SessionORM.findSessionByRoomId(roomId));
    console.log(`Found ${output}`);
    if (output == null) {
        return '';
    }
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
        console.log(`Creating session with room id ${roomId}`);
        const newSession = await SessionORM.createSession(roomId);
        console.log(`Created session ${newSession}`);
        return newSession;
    } catch (err) {
        console.warn(err.message);
    }
};

export { getDocumentGivenRoomId, updateDocumentFromRoomId, createSessionFromRoomId };
