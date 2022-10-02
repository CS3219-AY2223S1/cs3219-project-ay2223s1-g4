import mongoose from 'mongoose';
import RoomModelSchema from './room-model.js';
import { DB_URI } from '../configs/config.js';

mongoose.connect(
    DB_URI,
    { useNewUrlParser: true, useUnifiedTopology: true }
);

let db = mongoose.connection;
db.on('error', console.error.bind(console, `Faced error when connecting to DB ${DB_URI}`));

await RoomModelSchema.deleteMany(); // reset states

export async function createRoom(params) {
    return new RoomModelSchema(params);
};

export async function findRoomByUserId(userId) {
    return RoomModelSchema.findById(userId, (err, room) => {
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
};

export async function removeRoomById(id) {
    RoomModelSchema.findByIdAndDelete(id, (err) => {
        if (err) {
            console.log(err);
            return;
        } 
        console.log(`Room id ${id} removed`);
    });
};

export async function findRoomById(id) {
    return await RoomModelSchema.findById(id);
};

export async function getAllRooms() {
    return await RoomModelSchema.find();
};
