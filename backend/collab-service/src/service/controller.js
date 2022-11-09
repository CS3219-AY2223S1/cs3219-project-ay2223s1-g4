import HttpStatus from 'http-status-codes';
import SessionORM from '../models/session-orm.js';
import Authenticator from '../auth/auth.js';
import CollabService from './service.js';

let CollabController = {
    closeSession: async (req, res) => {
        const roomid = req.params.room_id;

        const rawJwt = Authenticator.extractToken(req);
        const userSub = Authenticator.extractUserSub(req);
        const isUserInSession =await CollabService.checkUserIsInSession(roomid, userSub, rawJwt);
        if (!isUserInSession) {
            return res.status(HttpStatus.UNAUTHORIZED).end();
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

        const rawJwt = Authenticator.extractToken(req);
        const userSub = Authenticator.extractUserSub(req);
        const isUserInSession =await CollabService.checkUserIsInSession(roomid, userSub, rawJwt);
        if (!isUserInSession) {
            return res.status(HttpStatus.UNAUTHORIZED).end();
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
