import HttpStatus from 'http-status-codes';
import CollabORM from '../models/collab-orm.js';

let CollabController = {
    closeRoom: async (req, res) => {
        const roomid = req.params.room_id;
        await CollabORM.closeSessionByRoomId(roomid);
        return res.status(HttpStatus.OK).json();
    },

    getSession: async (req, res) => {
        const roomid = req.params.room_id;
        const document = await CollabORM.findSessionByRoomId(roomid);
        if (document == null) {
            return res.status(HttpStatus.NOT_FOUND).end();
        }
        return res.status(HttpStatus.OK).json(document);
    },
};

export default CollabController;
