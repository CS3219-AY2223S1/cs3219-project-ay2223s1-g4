import {
    createRoom,
    removeRoomById,
    findRoomById,
    findRoomByUserId,
    getAllRooms
} from './repository.js';

export async function ormFindRoomByUserId(userid) {
    try {
        return await findRoomByUserId(userid);

    } catch (err) {
        console.log('ERROR: Could not find room');
        return { err };
    }
};

export async function ormGetRooms() {
    try {
        return await getAllRooms();

    } catch (err) {
        console.log('ERROR: Could not find rooms');
        return { err };
    }
};

export async function ormFindRoomById(roomid) {
    try {
        return await findRoomById(roomid);

    } catch (err) {
        console.log('ERROR: Could not find room');
        return { err };
    }
};

export async function ormCreateRoom(userid1, userid2, questionid) {
    try {
        const newRoom = await createRoom({ userid1, userid2, questionid });
        newRoom.save();
        return newRoom;

    } catch (err) {
        console.log('ERROR: Could not create new room');
        return { err };
    }
};

export async function ormRemoveRoomById(roomId) {
    try {
        await removeRoomById(roomId);
        return true;

    } catch (err) {
        console.log(`ERROR: Could not remove room ${roomId}`);
        console.log(err);
        return { err };
    }
};
