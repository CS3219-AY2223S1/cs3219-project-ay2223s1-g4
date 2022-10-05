import CodeBox from "../components/CodeBox";
import QuestionBox from "../components/QuestionBox";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { URL_MATCHING_ROOM_SVC } from "../configs";

function RoomPage() {
    const { collabId: roomId } = useParams();
    const [questionId, setQuestionId] = useState(0);
    const [user1, setUser1] = useState(0);
    const [user2, setUser2] = useState(0);

    let navigateTo = useNavigate();
    
    useEffect(() => {
        axios.get(`${URL_MATCHING_ROOM_SVC}/${roomId}`)
            .then((res) => {
                setUser1(res.data.room.userid1);
                setUser2(res.data.room.userid2);
                setQuestionId(res.data.room.questionid);
            })
            .catch((err) => {
                console.log(err);
                navigateTo('../selectdifficulty');
            });
    }, [navigateTo, roomId]);

    const closeRoom = () => {
        axios.delete(`${URL_MATCHING_ROOM_SVC}/${roomId}`)
            .then((res) => {
                console.log(res.status);
                alert('Session has been closed.');
                navigateTo('..');
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <Box>
            <Typography>Coding session with {user1} and {user2} in room {roomId} using question {questionId}</Typography>
            <QuestionBox questionId={questionId} />
            <CodeBox roomId={roomId} />
            <Button variant="contained" onClick={closeRoom}>End Session</Button>
        </Box>
    );
}

export default RoomPage;
