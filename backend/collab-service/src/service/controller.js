import axios from 'axios';
import HttpStatus from 'http-status-codes';
import SessionORM from '../models/session-orm.js';
import { ROOM_URI } from '../configs/config.js';

const checkUserIsInSession = async (roomId, jwtToken) => {
    const userId = jwtToken.sub;
    return axios.get(`${ROOM_URI}/api/room/${roomId}`, {
            headers: { Authorization: `Bearer ${jwtToken}` }
        })
        .then((res) => {
            return res.data.userid1 === userId || res.data.userid2 === userId;
        })
        .catch((err) => {
            console.log(err);
            return false;
        });
};

let CollabController = {
    closeSession: async (req, res) => {
        const roomid = req.params.room_id;

        const jwtTokenStr = req.headers.authorization.split(" ")[1];
        if (!checkUserIsInSession(roomid, jwtTokenStr)) {
            return res.status(HttpStatus.FORBIDDEN).end();
        }

        const session = await SessionORM.findSessionByRoomId(roomid);
        console.log(`Found ${session} to update`);
        if (session == null) {
            return res.status(HttpStatus.NOT_FOUND).end();
        }

        let response = await SessionORM.closeSessionByRoomId(roomid);
        console.log(`Updated to ${response}`);
        if (response == null) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).end();
        }
        return res.status(HttpStatus.OK).end();
    },

    getSession: async (req, res) => {
        const roomid = req.params.room_id;

        const jwtTokenStr = req.headers.authorization.split(" ")[1];
        if (!checkUserIsInSession(roomid, jwtTokenStr)) {
            return res.status(HttpStatus.FORBIDDEN).end();
        }

        console.log(`Finding session for room id ${roomid}`);
        const session = await SessionORM.findSessionByRoomId(roomid);
        console.log(`Got session ${session}`);

        if (session == null) {
            return res.status(HttpStatus.NOT_FOUND).end();
        }
        return res.status(HttpStatus.OK).json(session);
    },
};

export default CollabController;
