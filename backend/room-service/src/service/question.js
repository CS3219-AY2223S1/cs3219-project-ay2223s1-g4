import axios from 'axios';

const client = axios.create(
    {
        baseURL: "http://localhost:8003/api/question/",
        headers:{
            Accept: 'application/json',
            post: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            put: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }
    }
)

async function getQuestionIdFromDifficulty(userId, difficulty) {
    const questionQueryUrl = `id`; // TODO
    const body = {difficulty:  difficulty.toLowerCase() , user_id : userId.toString()}
    return client.post(questionQueryUrl, body)
        .then((res) => {
            return res.data.id;
        })
        .catch((err) => {
            console.error(err);
            return 2; // TODO return default id
        });
}

async function getRandomQuestionIdFromDifficulty(userId, difficulty) {
    const questionQueryUrl = `id`; // TODO
    const body = {difficulty: difficulty, user_id : userId.toString()}
    client.post(questionQueryUrl, body)
        .then((res) => {
            return res.data.id;
        })
        .catch((err) => {
            console.error(err);
            return 2; // TODO return default id
        });
}

export { getQuestionIdFromDifficulty };
