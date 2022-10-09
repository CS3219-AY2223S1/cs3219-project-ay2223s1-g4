import axios from 'axios';

function getQuestionIdFromDifficulty(difficulty) {
    let questionidMap = {
        EASY: 0,
        MEDIUM: 1,
        HARD: 2,
    };
    return (questionidMap.hasOwnProperty(difficulty))
        ? questionidMap[difficulty]
        : questionidMap['EASY'];
}

async function getRandomQuestionIdFromDifficulty() {
    const questionQueryUrl = ``; // TODO
    axios.get(questionQueryUrl)
        .then((res) => {
            return res.data.questionId;
        })
        .catch((err) => {
            console.error(err);
            return null; // TODO return default id
        });
}

export { getQuestionIdFromDifficulty };
