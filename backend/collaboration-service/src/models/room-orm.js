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

    removeRoomById: async (id) => {
        RoomModel.findByIdAndDelete(id, (err) => {
            if (err) {
                console.log(err);
                return;
            } 
            console.log(`Room id ${id} removed`);
        });
    },

    closeRoomById: async (id) => {
        return await RoomModel.findByIdAndUpdate(id, {
            isOpen: false
        });
    },

    findRoomById: async (id) => {
        return await RoomModel.findById(id);
    },

    updateDocumentFromId: async (id, document) => {
        if (!(await RoomModel.findById(id)).isOpen) {
            throw Error(`Room ${id} is already closed, unable to update document`);
        }
        return await RoomModel.findByIdAndUpdate(id, {
            document: document
        });
    },
}

export default RoomORM;
