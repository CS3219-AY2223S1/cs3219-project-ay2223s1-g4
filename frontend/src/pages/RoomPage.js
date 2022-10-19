import CodeBox from "../components/CodeBox";
import QuestionBox from "../components/QuestionBox";
import Prompt from "../components/dialogs/Prompt";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { URL_MATCHING_ROOM_SVC } from "../configs";
import { io } from 'socket.io-client';

function RoomPage() {
    const { collabId: roomId } = useParams();
    const [ questionId, setQuestionId ] = useState(1);
    const [ user1, setUser1 ] = useState(0);
    const [ user2, setUser2 ] = useState(0);
    const [ isPromptOpen, setIsPromptOpen ] = useState(false);
    const [ socket, setSocket ] = useState();
    const { isAuthenticated, isLoading } = useAuth0();

    useEffect(() => {
        const s = io('http://localhost:8005');
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
                navigateTo('../');
            });
    }, [navigateTo, roomId]);

    useEffect(() => {
        if (socket == null) {
            return;
        }
        const handler = () => {
            console.log('Session is closed');
            socket.emit('leave-room', `room-${roomId}`);
            alert('Peer has closed the session');
            setTimeout(() => navigateTo('../dashboard'), 3 * 1000);
        }
        socket.on('leave-room', handler);
        return;
    }, [navigateTo, socket, roomId]);

    const closeRoom = () => {
        setIsPromptOpen(false);
        socket.emit('leave-room', `room-${roomId}`);
        navigateTo('../dashboard');
        axios.put(`${URL_MATCHING_ROOM_SVC}/${roomId}`)
            .then((res) => {
                console.log(res.status);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    
    const prompt = () => {
        setIsPromptOpen(true);
    }

    const undoPrompt = () => {
        setIsPromptOpen(false);
    }

    if (isLoading) {
        return <div>Loading ...</div>;
    };

    if (!isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    };

    return (
        <Box>
            <Prompt
                message={"Are you sure you would like to close the session?"}
                isOpen={isPromptOpen}
                handleYes={closeRoom}
                handleNo={undoPrompt}
            />
            <Typography>Coding session with {user1} and {user2} in room {roomId} using question {questionId}</Typography>
            <QuestionBox questionId={questionId} interviewer={true} />
            <CodeBox roomId={roomId} socket={socket} />
            <Button variant="contained" onClick={prompt}>End Session</Button>
        </Box>
    );
}

export default RoomPage;
