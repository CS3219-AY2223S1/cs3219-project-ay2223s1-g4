import { 
    ormCreateMatch,
    ormDeleteMatch,
    ormFindByUserId,
    ormFindByMatchId,
    ormIndex
} from '../model/matching-orm.js';

/*
IDEA:
browser calls POST to create, server returns match id
browser then listens based on match id if there is a response on server end
- if server finds match, then return output
- if server doesnt, either timeout on server or on front end
    - we then delete entry in db
if match, update match to a partner id?
*/

const findById = (req, res) => {
    return res.json();
};

const findByUserId = (req, res) => {
    res.json();
};

const update = (req, res) => {
    res.json();
};

const remove = (req, res) => {
    return res.json();
};

const index = (req, res) => {
    console.log("findById called");
    ormIndex().then((matches) => {
        console.log(matches);
        return res.json({
            data: matches
        });
    })
    .catch((err) => { 
        console.log(err);
        return res.status(500).json({
            message: 'Database failure when loading!'
        });
    });
};

const create = (req, res) => {
    return res.json();
};

export {
    findById,
    findByUserId,
    update,
    remove,
    index,
    create
};
