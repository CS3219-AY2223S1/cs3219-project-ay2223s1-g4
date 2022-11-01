import HttpStatus from 'http-status-codes';
import jwt_decode from 'jwt-decode';
import RoomORM from '../models/room-orm.js';
import { getQuestionTitle, getSessionDetails, getUserNickname } from './caller.js';

let RoomController = {    
    getRoomsByUserId: async (req, res)  => {
        const jwtToken = jwt_decode(req.headers.authorization.split(" ")[1]);
        const userId = decodeURI(req.params.user_id);
        if (jwtToken.sub !== userId) {
            console.log(`Invalid user ${jwtToken.sub} vs ${userId}`);
            return res.status(HttpStatus.FORBIDDEN).end();
        }
        console.log(`Finding rooms for user id ${userId}`);
        
        const userRooms = await RoomORM.findRoomsByUser(userId);
        console.log(`Found rooms ${userRooms}, now getting details for each...`);
        const populatedUserRooms = await Promise.all(userRooms.map(async (room) => {
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
        }));

        populatedUserRooms.sort((detailsA, detailsB) => {
            if (detailsA.startDateTime.getDate() != detailsB.startDateTime.getDate()) {
                return (detailsA.startDateTime.getDate() < detailsB.startDateTime.getDate())
                    ? -1
                    : 1;
            }
            if (detailsA.startDateTime.getTime() != detailsB.startDateTime.getTime()) {
                return (detailsA.startDateTime.getTime() < detailsB.startDateTime.getTime())
                    ? -1
                    : 1;
            }
            return 0;
        });
        console.log(`Updated rooms are ${JSON.stringify(populatedUserRooms)}`);

        return res.status(HttpStatus.OK).json(populatedUserRooms);
    },
    
    getRoomDetails: async (req, res)  => {
        const jwtToken = jwt_decode(req.headers.authorization.split(" ")[1]);
        const roomid = req.params.room_id;
        console.log(`Finding room id ${roomid}`);

        const room = await RoomORM.findRoomById(roomid);
        console.log(`Found room ${room}`);

        if (!room) {
            return res.status(HttpStatus.NOT_FOUND).end();
        }
        if (jwtToken.sub !== room.userid1 && jwtToken.sub !== room.userid2) {
            console.log(`Invalid user ${jwtToken.sub} vs ${room.userid1}|${room.userid2}`);
            return res.status(HttpStatus.FORBIDDEN).end();
        }
        return res.status(HttpStatus.OK).json(room);
    }
};

export default RoomController;
