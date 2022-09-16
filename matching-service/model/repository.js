import 'dotenv/config';
import mongoose from "mongoose";
import MatchModelSchema from './match-model.js';
import RoomModelSchema from './room-model.js';

let mongoDB = (process.env.ENV === "PROD")
    ? process.env.DB_CLOUD_URI
    : process.env.DB_LOCAL_URI;

mongoose.connect(
    mongoDB,
    { useNewUrlParser: true, useUnifiedTopology: true }
);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

async function removeAllMatches() {
    await MatchModelSchema.deleteMany();
}

async function removeAllRooms() {
    await RoomModelSchema.deleteMany();
}

await MatchModelSchema.deleteMany();
await RoomModelSchema.deleteMany();

export async function createMatch(params) {
    return new MatchModelSchema(params);
};

export async function getAllMatches() {
    return await MatchModelSchema.find({});
};

export async function findMatchByDifficulty(difficulty) {
    return await MatchModelSchema.find({difficulty: difficulty});
};

export async function removeMatchById(id) {
    MatchModelSchema.findByIdAndDelete(id, (err) => {
        if (err) {
            console.log(err);
            return;
        } 
        console.log(`Match id ${id} removed`);
    });
};

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
