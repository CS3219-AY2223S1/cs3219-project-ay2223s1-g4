import { matchingRepository } from './repository.js';
import { Sequelize, DataTypes } from 'sequelize';

let MatchingModelSchema = matchingRepository.define(
    'Match',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false
        },
        setDifficulty: {
            type: Sequelize.ENUM("EASY", "MEDIUM", "HARD"),
            allowNull: false
        }
    },
    { indexes: [{ unique: true, fields: ['id'] }] }
);

export { 
    MatchingModelSchema,
    matchingRepository,
};
