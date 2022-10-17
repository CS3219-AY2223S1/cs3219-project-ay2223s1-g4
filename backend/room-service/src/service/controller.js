import HttpStatus from 'http-status-codes';
import RoomORM from '../models/room-orm.js';

let RoomController = {    
    getRooms: async (req, res)  => {
        const rooms = await RoomORM.getAllRooms();
        return res.status(HttpStatus.OK).json({
            rooms: rooms
        });
    },

    getRoomsByUserId: async (req, res)  => {
        const userId = req.params.user_id;
        const userRooms = await RoomORM.findRoomsByUser(userId);
        return res.status(HttpStatus.OK).json({
            rooms: userRooms
        });
    },
    
    getRoomDetails: async (req, res)  => {
        const roomid = req.params.room_id;
        const room = await RoomORM.findRoomById(roomid);
        if (!room || room.err) {
            return res.status(HttpStatus.NOT_FOUND);
        }
        return res.status(HttpStatus.OK).json({
            room: room
        });
    }
};

export default RoomController;
