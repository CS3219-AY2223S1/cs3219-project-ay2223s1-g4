import mongoose from 'mongoose';
import RoomModel from './room-model.js';
import { DB_URI } from '../configs/config.js';

let Respository = {
    start: async () => {
        mongoose.connect(
            DB_URI,
            { useNewUrlParser: true, useUnifiedTopology: true }
        );
        let db = mongoose.connection;
        db.once('open', () => {
            console.log(`Connected to database ${DB_URI}`);
            RoomModel.deleteMany({}).then((output) => {
                console.log('Database cleared');
            });
        });
        db.on('error', () => {
            console.error.bind(console, `Faced error when connecting to database ${DB_URI}`);
            process.exit(1);
        });
    }
};

export default Respository;
