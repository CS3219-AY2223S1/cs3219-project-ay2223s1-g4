import axios from 'axios';

function getQuestionIdFromDifficulty(difficulty) {
    let questionidMap = {
        EASY: 0,
        MEDIUM: 1,
        HARD: 2,
    };
    return (questionidMap.hasOwnProperty(difficulty))
        ? questionidMap[difficulty]
        : 0;
}

export { getQuestionIdFromDifficulty };
