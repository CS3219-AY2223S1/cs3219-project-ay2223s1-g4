import HttpStatus from 'http-status-codes';
import RoomORM from '../models/room-orm.js';

let RoomController = {
    closeRoom: async (req, res) => {
        const roomid = req.params.room_id;
        await RoomORM.closeRoomById(roomid);
        return res.status(HttpStatus.OK).json();
    },
    
    getRooms: async (req, res)  => {
        const rooms = await RoomORM.getAllRooms();
        return res.status(HttpStatus.OK).json({
            rooms: rooms
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
