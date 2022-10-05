import RoomORM from '../models/room-orm.js';
import { getQuestionIdFromDifficulty } from './question.js';

async function createRoom(userid1, userid2, difficulty) {
    const questionId = getQuestionIdFromDifficulty(difficulty);
    const room = await RoomORM.createRoom(userid1, userid2, questionId);
    console.log(`Room ${room} created`);
    return room;
};

async function updateDocumentGivenId(roomId, document) {
    try {
        return await RoomORM.updateDocumentFromId(roomId, document);
    } catch (err) {
        console.warn(err.message);
    }
};

async function getDocumentGivenId(roomId) {
    let output = (await RoomORM.findRoomById(roomId)).document;
    return output;
};

export { createRoom, getDocumentGivenId, updateDocumentGivenId };
