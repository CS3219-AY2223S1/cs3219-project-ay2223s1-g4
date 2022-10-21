import Box from '@mui/material/Box';
import ReactMarkdown from 'react-markdown'
import React, { useEffect, useState } from "react";
import { Tab, Tabs, Typography } from '@mui/material';
import TabPanel, { a11yProps } from './tab/TabPanel';
import { getQuestion } from '../services/question_service';

function QuestionBox({ questionId = 1, interviewer = false}) {
    const [title, setTitle] = useState('Loading Title');
    const [problem, setProblem] = useState('Loading question...');
    const [solution, setSolution] = useState('Loading solution...');
    // const [id, setId] = React.useState(0);
    const [tab, setTab] = React.useState(0);

    useEffect(() => {
        console.log(`Displaying question ${questionId}`);
        // const questions = [EASY_QUESTION, MEDIUM_QUESTION, HARD_QUESTION];
        

        getQuestion(questionId, {solution: interviewer}).then((res) => {
            // console.log(res)
            setTitle(res.title);
            setProblem(res.question);
            setSolution(res.solution);
        })
        .catch((err) => {
            console.log(err);
            alert('Opps... Something went wrong! Please try again.');
        });
    });

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
            {/* <Typography variant='h2' >{id}</Typography> */}
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
