import axios from 'axios';
import SessionORM from '../models/session-orm.js';
import { ROOM_URI } from '../configs/config.js';

let CollabService = {
    getDocumentGivenRoomId: async (roomId) => {
        console.log(`Getting document for room ${roomId}`)
        let output = (await SessionORM.findSessionByRoomId(roomId));
        console.log(`Found ${output}`);
        if (output == null) {
            return '';
        }
        return output.document;
    },
    
    updateDocumentFromRoomId: async(roomId, document) => {
        try {
            return await SessionORM.updateDocumentFromRoomId(roomId, document);
        } catch (err) {
            console.warn(err.message);
        }
    },
    
    createSessionFromRoomId: async (roomId) => {
        try {
            console.log(`Creating session with room id ${roomId}`);
            const newSession = await SessionORM.createSession(roomId);
            console.log(`Created session ${newSession}`);
            return newSession;
        } catch (err) {
            console.warn(err.message);
        }
    },
    
    checkUserIsInSession: async (roomId, userId, jwtToken) => {
        return await axios.get(`${ROOM_URI}/api/room/${roomId}`, {
                headers: { Authorization: `Bearer ${jwtToken}` }
            })
            .then((res) => {
                return res.data.userid1 === userId || res.data.userid2 === userId;
            })
            .catch((err) => {
                console.log(err);
                return false;
            });
    },
};

export default CollabService;
