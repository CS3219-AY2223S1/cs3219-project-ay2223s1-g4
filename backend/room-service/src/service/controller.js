import HttpStatus from 'http-status-codes';
import RoomORM from '../models/room-orm.js';
import { getQuestionTitle, getSessionDetails, getUserNickname } from './caller.js';

let RoomController = {    
    getRoomsByUserId: async (req, res)  => {
        const jwtToken = req.headers.authorization.split(" ")[1] | "";
        const userId = decodeURI(req.params.user_id);
        console.log(`Finding rooms for user id ${userId}`);
        
        const userRooms = await RoomORM.findRoomsByUser(userId);
        console.log(`Found rooms ${userRooms}, now getting details for each...`);
        const populatedUserRooms = await Promise.all(userRooms.map(async (room) => {
            let session = await getSessionDetails(room._id, jwtToken);
            let sessionEndTime = (!session || session.isOpen) ? null : session.updatedAt;
            let peerId = (userId === room.userid1) ? room.userid2 : room.userid1;
            return {
                startDateTime: room._id.getTimestamp(),
                endDateTime: sessionEndTime,
                peerNickname: await getUserNickname(peerId, jwtToken),
                questionTitle: await getQuestionTitle(room.questionid, jwtToken),
            };
        }));
        console.log(`Updated rooms are ${JSON.stringify(populatedUserRooms)}`);

        return res.status(HttpStatus.OK).json(populatedUserRooms);
    },
    
    getRoomDetails: async (req, res)  => {
        const roomid = req.params.room_id;
        console.log(`Finding room id ${roomid}`);

        const room = await RoomORM.findRoomById(roomid);
        console.log(`Found room ${room}`);

        if (!room) {
            return res.status(HttpStatus.NOT_FOUND).end();
        }
        return res.status(HttpStatus.OK).json(room);
    }
};

export default RoomController;
