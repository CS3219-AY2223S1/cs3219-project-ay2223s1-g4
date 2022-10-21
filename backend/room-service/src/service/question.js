import axios from 'axios';

async function getQuestionIdFromDifficulty(userId, difficulty) {
    return axios.post(
        'http://localhost:8003/api/question/id', 
        {
            difficulty: difficulty.toLowerCase(),
            user_id : userId.toString()
        })
        .then((res) => {
            return res.data.id;
        })
        .catch((err) => {
            console.error(err);
            return 1;
        });
}

export { getQuestionIdFromDifficulty };
