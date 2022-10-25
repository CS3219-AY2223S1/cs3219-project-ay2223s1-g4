import HttpStatus from 'http-status-codes';
import RoomORM from '../models/room-orm.js';

let RoomController = {    
    getRoomsByUserId: async (req, res)  => {
        const userId = req.params.user_id;
        console.log(`Finding rooms for user id ${userId}`);
        
        const userRooms = await RoomORM.findRoomsByUser(userId);
        console.log(`Found rooms ${userRooms}`);

        return res.status(HttpStatus.OK).json(userRooms);
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
