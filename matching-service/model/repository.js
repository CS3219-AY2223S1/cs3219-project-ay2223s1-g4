import { Sequelize } from 'sequelize';

const matchingRepository = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite3',
});

matchingRepository.authenticate()
    .then((result) => {
        console.log("Connection established.");
    })
    .catch((error) => {
        console.log("Unable to connect to db: ", error);
    });

export { matchingRepository };
