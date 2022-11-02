import axios from 'axios';
import { QUESTION_URI, SESSION_URI, USER_URI } from '../configs/config.js';

async function getQuestionIdFromDifficulty(userId, difficulty, jwtToken) {
    return axios.post(`${QUESTION_URI}/api/question/id`, {
            difficulty: difficulty.toLowerCase(),
            user_id : userId.toString()
        }, {
            headers: { Authorization: `Bearer ${jwtToken}` }
        })
        .then((res) => {
            return res.data.id;
        })
        .catch((err) => {
            console.error(`Hit error '${err.message}', default to return question id 0`);
            return 0;
        });
}

async function getQuestionTitle(questionId, jwtToken) {
    return axios.get(`${QUESTION_URI}/api/question/${questionId}?solution=false`, {
            headers: { Authorization: `Bearer ${jwtToken}` }
        })
        .then((res) => {
            return res.data.title;
        })
        .catch((err) => {
            console.error(`Hit error '${err.message}', default to return question title ''`);
            return 'question';
        });
}

async function getSessionDetails(roomId, jwtToken) {
    return axios.get(`${SESSION_URI}/api/session/room/${roomId}`, {
            headers: { Authorization: `Bearer ${jwtToken}` }
        })
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            console.error(`Hit error '${err.message}', default to return session details false`);
            return null;
        });
}

async function getUserNickname(userId, jwtToken) {
    return axios.get(`${USER_URI}/api/user/username/${encodeURI(userId)}`, {
            headers: { Authorization: `Bearer ${jwtToken}` }
        })
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            console.error(`Hit error '${err.message}', default to return nickname peer`);
            return 'peer';
        });
}

export { getQuestionIdFromDifficulty, getQuestionTitle, getSessionDetails, getUserNickname };
