import HttpStatus from 'http-status-codes';
import SessionORM from '../models/session-orm.js';

let CollabController = {
    closeSession: async (req, res) => {
        const roomid = req.params.room_id;
        if ((await SessionORM.findSessionByRoomId(roomid)) == null) {
            return res.status(HttpStatus.NOT_FOUND).end();
        }
        await SessionORM.closeSessionByRoomId(roomid);
        return res.status(HttpStatus.OK).end();
    },

    getSession: async (req, res) => {
        const roomid = req.params.room_id;
        const document = await SessionORM.findSessionByRoomId(roomid);
        if (document == null) {
            return res.status(HttpStatus.NOT_FOUND).end();
        }
        return res.status(HttpStatus.OK).json(document);
    },
};

export default CollabController;
