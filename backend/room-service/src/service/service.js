import RoomORM from '../models/room-orm.js';
import { getQuestionIdFromDifficulty } from './question.js';

async function createRoom(userid1, userid2, difficulty) {
    const questionId = getQuestionIdFromDifficulty(difficulty);
    const room = await RoomORM.createRoom(userid1, userid2, questionId);
    console.log(`Room ${room} created`);
    return room;
};

export { createRoom };
