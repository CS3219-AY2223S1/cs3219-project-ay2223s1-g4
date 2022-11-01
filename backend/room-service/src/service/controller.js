import HttpStatus from 'http-status-codes';
import RoomORM from '../models/room-orm.js';
import Authenticator from '../auth/auth.js';
import { getQuestionTitle, getSessionDetails, getUserNickname } from './caller.js';

const sortByDateTime = (detailsA, detailsB) => {
    const timeA = detailsA.startDateTime;
    const timeB = detailsB.startDateTime;
    if (timeA.getDate() != timeB.getDate()) {
        return (timeA.getDate() < timeB.getDate()) ? -1 : 1;
    }
    if (timeA.getTime() != timeB.getTime()) {
        return (timeA.getTime() < timeB.getTime()) ? -1 : 1;
    }
    return 0;
};

const expandRoomDetails = async (room, userId, jwtToken) => {
    let session = await getSessionDetails(room._id, jwtToken);
    let sessionEndTime = (!session || session.isOpen) ? null : session.updatedAt;
    let peerId = (userId === room.userid1) ? room.userid2 : room.userid1;
    return {
        roomId: room._id.toHexString(),
        startDateTime: room._id.getTimestamp(),
        endDateTime: sessionEndTime,
        peerNickname: await getUserNickname(peerId, jwtToken),
        questionTitle: await getQuestionTitle(room.questionid, jwtToken),
    };
};

let RoomController = {
    getRoomsByUserId: async (req, res)  => {
        const userId = decodeURI(req.params.user_id);
        const userSub = Authenticator.extractUserSub(req);
        const jwtToken = Authenticator.extractToken(req);

        if (userSub !== userId) {
            console.log(`Invalid user ${userSub} vs ${userId}`);
            return res.status(HttpStatus.UNAUTHORIZED).end();
        }
        console.log(`Finding rooms for user id ${userId}`);
        
        const userRooms = await RoomORM.findRoomsByUser(userId);
        console.log(`Found rooms ${userRooms}, now getting details for each...`);

        const populatedUserRooms = await Promise.all(
            userRooms.map((room) => expandRoomDetails(room, userId, jwtToken))
        );
        populatedUserRooms.sort(sortByDateTime);
        console.log(`Updated rooms are ${JSON.stringify(populatedUserRooms)}`);

        return res.status(HttpStatus.OK).json(populatedUserRooms);
    },
    
    getRoomDetails: async (req, res)  => {
        const userSub = Authenticator.extractUserSub(req);
        const roomid = req.params.room_id;
        console.log(`Finding room id ${roomid}`);

        const room = await RoomORM.findRoomById(roomid);
        console.log(`Found room ${room}`);

        if (room == null) {
            return res.status(HttpStatus.NOT_FOUND).end();
        }
        if (userSub !== room.userid1 && userSub !== room.userid2) {
            console.log(`Invalid user ${userSub} vs ${room.userid1}|${room.userid2}`);
            return res.status(HttpStatus.UNAUTHORIZED).end();
        }
        console.log('User is valid, returning room');
        return res.status(HttpStatus.OK).json(room);
    }
};

export default RoomController;
