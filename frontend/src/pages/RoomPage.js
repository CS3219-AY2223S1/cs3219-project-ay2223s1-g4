import CodeBox from "../components/CodeBox";
import QuestionBox from "../components/QuestionBox";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { URL_MATCHING_ROOM_SVC } from "../configs";

function RoomPage() {
    const [roomId, setRoomId] = useState(0);
    const [questionId, setQuestionId] = useState(0);
    const [user1, setUser1] = useState(0);
    const [user2, serUser2] = useState(0);

    let navigateTo = useNavigate();
    const location = useLocation();
    
    useEffect(() => {
        if (!location['state'] || !location.state['roomid']) {
            navigateTo('../selectdifficulty');
            return;
        }
        setRoomId(location.state.roomid);
        axios.get(`${URL_MATCHING_ROOM_SVC}/${location.state.roomid}`)
            .then((res) => {
                setUser1(res.data.room.user1);
                serUser2(res.data.room.user2);
                setQuestionId(res.data.room.questionid);
            })
            .catch((err) => {
                console.log(err);
                navigateTo('../selectdifficulty');
            });
    }, [location, navigateTo]);

    const closeRoom = () => {
        axios.delete(`${URL_MATCHING_ROOM_SVC}/${location.state.roomid}`)
            .then((res) => {
                alert('Session has been closed.');
                navigateTo('../');
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <Box>
            <Typography>Coding session with {user1} and {user2} in room {roomId}</Typography>
            <QuestionBox questionId={questionId} />
            <CodeBox roomId={roomId} />
            <Button variant="contained" onclick={closeRoom}>End Session</Button>
        </Box>
    );
}

export default RoomPage;
