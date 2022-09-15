import { ormCreateMatch, ormRemoveMatchById, ormGetMatches, ormFindMatchByDifficulty } from '../model/match-orm.js';
import { ormCreateRoom, ormRemoveRoomById, ormFindRoomById, ormFindRoomByUserId, ormGetRooms } from '../model/room-orm.js';
import { io } from '../index.js';

async function timerToCallback(data, callback, sec) {
    setTimeout(() => callback(data), sec * 1000);
};

async function createRoom(userid1, userid2, difficulty) {
    let questionidMap = {
        EASY: 0,
        MEDIUM: 1,
        HARD: 2,
    };
    let questionId = (questionidMap.hasOwnProperty(difficulty))
        ? questionidMap[difficulty]
        : 0;
    let room = await ormCreateRoom(userid1, userid2, questionId);
    console.log(`Room ${room} created`);
    return room;
};

async function attemptToMatch(difficulty) {
    let existingMatches = await ormFindMatchByDifficulty(difficulty);
    console.log(`Found ${existingMatches} for ${difficulty}`);
    if (existingMatches.length >= 2) {
        let match1 = existingMatches.shift();
        let match2 = existingMatches.shift();

        let room = await createRoom(match1.userid, match2.userid, difficulty);
        io.in(`match-${match1._id.toString()}`).emit('provide-room', room._id);
        io.in(`match-${match2._id.toString()}`).emit('provide-room', room._id);

        ormRemoveMatchById(match1._id);
        ormRemoveMatchById(match2._id);
    }
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
    let diff = req.body.difficulty.toUpperCase();
    let userid = req.body.user.sub;
    let match = await ormCreateMatch(userid, diff);
    // TODO check logic if already exist/in room
    
    console.log(`Match ${match._id} for ${match.difficulty} created`);
    setTimeout(() => attemptToMatch(diff), 1 * 1000);
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
