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
import Loading from "../components/Loading";

function RoomPage() {
    const { collabId: roomId } = useParams();
    const [ questionId, setQuestionId ] = useState(1);
    const [ peer, setPeer ] = useState("Peer");
    const [ isPromptOpen, setIsPromptOpen ] = useState(false);
    const [ isInterviewer, setIsInterviewer ] = useState(false);
    const [ socket, setSocket ] = useState();
    const { isAuthenticated, isLoading, user } = useAuth0();

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
                if (user.sub === res.data.userid1) {
                    setIsInterviewer(true);
                    setPeer(res.data.userid2)
                } else {
                    setPeer(res.data.userid1)
                }
                setQuestionId(res.data.questionid);
            })
            .catch((err) => {
                console.log(err);
                navigateTo('../');
            });
    }, [navigateTo, roomId, user]);

    useEffect(() => {
        let isRunning = true;
        if (socket == null) {
            return;
        }
        const handleLeaveRoom = () => {
            console.log('Session is closed');
            socket.emit('leave-room', `room-${roomId}`);
            alert('Peer has closed the session');
            isRunning = false;
            navigateTo('../dashboard');
        }
        socket.on('leave-room', handleLeaveRoom);

        const handleBreakRoom = () => {
            if (isRunning) {
                alert('Peer has left the session. You may continue coding');
            }
        }
        socket.on('break-room', handleBreakRoom);

        const handlePeerJoinRoom = () => {
            alert('Peer has joined the session.');
        }
        socket.on('peer-join-room', handlePeerJoinRoom);
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
        return <Loading/>;
    }

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
            <Typography>Coding session with {peer} in room {roomId} using question {questionId}</Typography>
            <QuestionBox questionId={questionId} interviewer={isInterviewer} />
            <CodeBox roomId={roomId} socket={socket} />
            <Button variant="contained" onClick={prompt}>End Session</Button>
        </Box>
    );
}

export default RoomPage;
