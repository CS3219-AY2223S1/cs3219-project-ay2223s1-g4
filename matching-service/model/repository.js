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
    MatchModelSchema.deleteMany();
}

async function removeAllRooms() {
    RoomModelSchema.deleteMany();
}

export async function createMatch(params) {
    return new MatchModelSchema(params);
};

export async function getAllMatches() {
    return MatchModelSchema.find();
};

export async function findMatchByDifficulty(difficulty) {
    MatchModelSchema.find({difficulty: difficulty})
        .sort({date: 'ascending'})
        .exec((err, matches) => {
            if (!matches) {
                return null;
            }
            if (err) {
                console.log(err);
                return null;
            };
            return matches;
        });
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
    RoomModelSchema.findById(id, (err, room) => {
        if (err) {
            console.log(err);
            return null;
        } 
        return room;
    });
};

export async function getAllRooms() {
    return RoomModelSchema.find();
};
