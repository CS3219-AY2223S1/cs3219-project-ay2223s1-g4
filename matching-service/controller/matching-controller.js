import { ormCreateMatch, ormRemoveMatchById, ormGetMatches } from '../model/match-orm.js';
import { ormCreateRoom, ormRemoveRoomById, ormFindRoomById, ormFindRoomByUserId, ormGetRooms } from '../model/room-orm.js';

async function timerToCallback(data, callback, sec) {
    setTimeout(() => callback(data), sec * 1000);
};

async function createRoom(userid1, userid2, difficulty) {
    let questionid = 1; // TODO getQuestionFromDifficulty(difficulty);
    let room = await ormCreateRoom(userid1, userid2, questionid);
    // TODO open socket to emit room id
    return room;
};

async function getRoomDetailsFromUserId(userid) {
    let room = await ormFindRoomByUserId(userid);
    return room;
};

export async function getMatches(req, res) {
    let matches = await ormGetMatches();
    return res.status(200).json({
        matches: matches
    });
};

export async function createMatchEntry(req, res) {
    let diff = req.body.difficulty;
    let userid = req.body.user.sub; // TODO check if object is valid
    let match = await ormCreateMatch(userid, diff);
    // TODO open socket to emit matching status
    timerToCallback(match._id, (id) => {
        console.log(`Cleaning up match with userid ${id}`);
        ormRemoveMatchById(id);
    }, 30);

    return res.status(200).json({
        matchId: match._id
    });
};

export async function closeRoom(req, res) {
    let roomid = req.params.room_id;
    await ormRemoveRoomById(roomid);
    // TODO close room socket
    return res.status(200);
};

export async function getRooms(req, res) {
    let rooms = ormGetRooms();
    return res.status(200).json({
        rooms: rooms
    });
};

export async function getRoomDetails(req, res) {
    let roomid = req.params.room_id;
    let room = ormFindRoomById(roomid);
    if (!room) {
        return res.status(404);
    }
    return res.status(200).json({
        room: room
    });
};
