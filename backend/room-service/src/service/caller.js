import axios from 'axios';
import { QUESTION_URI, SESSION_URI } from '../configs/config.js';

async function getQuestionIdFromDifficulty(userId, difficulty) {
    return axios.post(`${QUESTION_URI}/api/question/id`, {
            difficulty: difficulty.toLowerCase(),
            user_id : userId.toString()
        })
        .then((res) => {
            return res.data.id;
        })
        .catch((err) => {
            console.error(`Hit error '${err.message}', default to return question id 0`);
            return 0;
        });
}

async function getQuestionTitle(questionId) {
    return axios.get(`${QUESTION_URI}/api/question/${questionId}`)
        .then((res) => {
            return res.data.title | '';
        })
        .catch((err) => {
            console.error(`Hit error '${err.message}', default to return question title ''`);
            return '';
        });
}

async function getSessionDetails(roomId) {
    return axios.get(`${SESSION_URI}/api/session/room/${roomId}`)
        .then((res) => {
            return res.data.isOpen;
        })
        .catch((err) => {
            console.error(`Hit error '${err.message}', default to return session details false`);
            return false;
        });
}

export { getQuestionIdFromDifficulty, getQuestionTitle, getSessionDetails };
