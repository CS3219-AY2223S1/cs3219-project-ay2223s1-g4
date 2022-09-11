import 'dotenv/config';
import { Sequelize, DataTypes, Model } from 'sequelize';

const matchingRepository = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite3',
});

export { matchingRepository };
