import RoomORM from '../models/room-orm.js';
import { getQuestionIdFromDifficulty } from './question.js';

async function createRoom(userid1, userid2, difficulty) {
    const chosenUserId = (Math.floor(Math.random()) === 1)
        ? userid1
        : userid2;
    const questionId = await getQuestionIdFromDifficulty(chosenUserId, difficulty);
    const room = await RoomORM.createRoom(userid1, userid2, questionId);
    console.log(`Room ${room} created`);
    return room;
};

export { createRoom };
