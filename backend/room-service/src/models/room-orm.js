import RoomModel from './room-model.js';

let RoomORM = {
    createRoom: async (userId1, userId2, questionId) => {
        const room = new RoomModel({
            userid1: userId1,
            userid2: userId2,
            questionid: questionId
        });
        await room.save();
        return room;
    },

    removeRoomById: async (id) => {
        await RoomModel.findByIdAndDelete(id, (err) => {
            if (err) {
                console.log(err);
                return;
            } 
            console.log(`Room id ${id} removed`);
        });
    },

    findRoomsByUser: async (userId) => {
        return RoomModel.find({$or: [
            {userid1: userId},
            {userid2: userId}
        ]})
        .then((docs) => {
            return docs;
        })
        .catch((err) => {
            console.log(err.message);
            return [];
        });
    },

    findRoomById: async (id) => {
        return RoomModel.findById(id)
            .then((doc) => {
                return doc;
            })
            .catch((err) => {
                console.log(err.message);
                return null;
            });
    },
}

export default RoomORM;
