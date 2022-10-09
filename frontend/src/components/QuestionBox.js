import Box from '@mui/material/Box';
import ReactMarkdown from 'react-markdown'
import React, { useEffect, useState } from "react";
import EASY_QUESTION from '../mock/EasyQuestion';
import MEDIUM_QUESTION from '../mock/MediumQuestion';
import HARD_QUESTION from '../mock/HardQuestion';
import { Tab, Tabs, Typography } from '@mui/material';
import TabPanel, { a11yProps } from './tab/TabPanel';

function QuestionBox({ questionId }) {
    const [title, setTitle] = useState('Loading Title');
    const [problem, setProblem] = useState('Loading question...');
    const [solution, setSolution] = useState('Loading solution...');

    const [tab, setTab] = React.useState(0);

    useEffect(() => {
        console.log(`Displaying question ${questionId}`);
        const questions = [EASY_QUESTION, MEDIUM_QUESTION, HARD_QUESTION];
        const randomQuestion = questions[Math.max(
            0,
            Math.min(questionId, questions.length - 1)
        )];
        setTitle("Two Sum");
        setProblem(randomQuestion);
        setSolution('Solution')
    }, [questionId]);

    const handleChange = (event, tabVal) => {
        setTab(tabVal);
      };

    return (
        <Box
            sx={{
                bgcolor: '#F8F8F8'
            }}
            paddingX='10px'
            paddingY='1px'
            margin='3px'
        >
            <Typography variant='h2' >{title}</Typography>
            <Tabs value={tab} onChange={handleChange} >
                <Tab label="Problem" {...a11yProps(0)} />
                <Tab label="Solution" {...a11yProps(1)} />
            </Tabs>
            <TabPanel value={tab} index={0}>
                <ReactMarkdown>
                    {problem}
                </ReactMarkdown>
            </TabPanel>
            <TabPanel value={tab} index={1}>
                <ReactMarkdown>
                    {solution}
                </ReactMarkdown>
            </TabPanel>
        </Box>
    );
}

export default QuestionBox;
