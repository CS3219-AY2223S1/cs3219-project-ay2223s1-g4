import RoomModel from './room-model.js';

let RoomORM = {
    createRoom: async (userId1, userId2, questionId) => {
        const room = new RoomModel({
            userid1: userId1,
            userid2: userId2,
            questionid: questionId
        });
        room.save();
        return room;
    },
    
    findRoomByUserId: async (userId) => {
        return RoomModel.findById(userId, (err, room) => {
            if (!room) {
                console.warn(`Room for user ${userId} does not exist`);
                return null;
            }
            if (err) {
                console.warn(`Unable to load room for user ${userId}`);
                return null;
            };
            return room;
        });
    },

    removeRoomById: async (id) => {
        RoomModel.findByIdAndDelete(id, (err) => {
            if (err) {
                console.log(err);
                return;
            } 
            console.log(`Room id ${id} removed`);
        });
    },

    findRoomById: async (id) => {
        return await RoomModel.findById(id);
    },
    
    getAllRooms: async () => {
        return await RoomModel.find();
    }
}

export default RoomORM;
