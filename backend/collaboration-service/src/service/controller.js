import {
    ormCreateRoom,
    ormRemoveRoomById,
    ormFindRoomById,
    ormGetRooms
} from '../models/room-orm.js';
import { getQuestionIdFromDifficulty } from './question.js';

async function createRoom(userid1, userid2, difficulty) {
    const questionId = getQuestionIdFromDifficulty(difficulty);
    let room = await ormCreateRoom(userid1, userid2, questionId);
    console.log(`Room ${room} created`);
    return room;
};

export async function closeRoom(req, res) {
    let roomid = req.params.room_id;
    await ormRemoveRoomById(roomid);
    return res.status(200).json();
};

export async function getRooms(req, res) {
    let rooms = await ormGetRooms();
    return res.status(200).json({
        rooms: rooms
    });
};

export async function getRoomDetails(req, res) {
    let roomid = req.params.room_id;
    let room = await ormFindRoomById(roomid);
    console.log(room);
    if (!room || room.err) {
        return res.status(404);
    }
    return res.status(200).json({
        room: room
    });
};
