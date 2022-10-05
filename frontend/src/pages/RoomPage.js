import CodeBox from "../components/CodeBox";
import QuestionBox from "../components/QuestionBox";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { URL_MATCHING_ROOM_SVC } from "../configs";
import { io } from 'socket.io-client';
import { URI_COLLAB_SVC } from '../configs';

function RoomPage() {
    const { collabId: roomId } = useParams();
    const [ questionId, setQuestionId ] = useState(0);
    const [ user1, setUser1 ] = useState(0);
    const [ user2, setUser2 ] = useState(0);
    const [ socket, setSocket ] = useState();

    useEffect(() => {
        const s = io(URI_COLLAB_SVC);
        s.emit('join-room', `room-${roomId}`);
        setSocket(s);
        return () => {
            s.disconnect();
        };
    }, [roomId]);
    
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

    useEffect(() => {
        if (socket == null) {
            return;
        }
        const handler = () => {
            console.log('Session is closed');
            alert('Peer has closed the session');
            navigateTo('../');
        }
        socket.on('leave-room', handler);
        return;
    }, [navigateTo, socket]);

    const closeRoom = () => {
        axios.delete(`${URL_MATCHING_ROOM_SVC}/${roomId}`)
            .then((res) => {
                console.log(res.status);
                socket.emit('leave-room', `room-${roomId}`);
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
            <CodeBox roomId={roomId} socket={socket} />
            <Button variant="contained" onClick={closeRoom}>End Session</Button>
        </Box>
    );
}

export default RoomPage;
