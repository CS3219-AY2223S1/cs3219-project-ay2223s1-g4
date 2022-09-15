import Box from '@mui/material/Box';
import ReactMarkdown from 'react-markdown'
import React, { useEffect, useState } from "react";
import EASY_QUESTION from '../mock/EasyQuestion';
import MEDIUM_QUESTION from '../mock/MediumQuestion';
import HARD_QUESTION from '../mock/HardQuestion';

function QuestionBox({ questionId }) {
    const [content, setContent] = useState('Loading question...');

    useEffect(() => {
        console.log(`Displaying question ${questionId}`);
        const questions = [EASY_QUESTION, MEDIUM_QUESTION, HARD_QUESTION];
        const randomQuestion = questions[Math.max(
            0,
            Math.min(questionId, questions.length - 1)
        )];
        setContent(randomQuestion);
    }, [questionId]);
    
    return (
        <Box
            sx={{
                bgcolor: '#F8F8F8'
            }}
            paddingX='10px'
            paddingY='1px'
            margin='3px'
        >
            <ReactMarkdown>
                {content}
            </ReactMarkdown>
        </Box>
    );
}

export default QuestionBox;
