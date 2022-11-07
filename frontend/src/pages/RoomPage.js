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
import { URL_MATCHING_ROOM_SVC, URL_USER_SVC, URI_COLLAB_SVC } from "../configs";
import { io } from 'socket.io-client';
import Loading from "../components/loading";

function RoomPage() {
    const { collabId: roomId } = useParams();
    const [ questionId, setQuestionId ] = useState(1);
    const [ peer, setPeer ] = useState("Peer");
    const [ isPromptOpen, setIsPromptOpen ] = useState(false);
    const [ isSolutionRevealed, setIsSolutionRevealed ] = useState(false);
    const [ isInterviewer, setIsInterviewer ] = useState(false);
    const [ socket, setSocket ] = useState();
    const { isAuthenticated, isLoading, user, getAccessTokenSilently } = useAuth0();

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
        getAccessTokenSilently().then((token) => {
            axios.get(`${URL_MATCHING_ROOM_SVC}/${roomId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                .then((res) => {
                    setIsInterviewer(false);
                    setQuestionId(res.data.questionid);
                    let peerId = (user.sub === res.data.userid1)
                        ? res.data.userid1
                        : res.data.userid2;
                    axios.get(`${URL_USER_SVC}/username/${peerId}`, {
                            headers: { Authorization: `Bearer ${token}` }
                        })
                        .then((content) => {
                            setPeer(content.data);
                        })
                        .catch((error) => {
                            console.log(error);
                            navigateTo('../');
                        });
                })
                .catch((err) => {
                    console.log(err);
                    navigateTo('../');
                });
            axios.get(`${URI_COLLAB_SVC}/api/session/room/${roomId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                .then((res) => {
                    if (!res.data.isOpen) {
                        setIsInterviewer(true);
                        setIsSolutionRevealed(true);
                    }
                })
                .catch((error) => {
                    console.log(error);
            });
        });

    }, [getAccessTokenSilently, navigateTo, roomId, user]);

    useEffect(() => {
        let isRunning = true;
        if (socket == null) {
            return;
        }
        const endSession = () => {
            console.log('Session is closed');
            if (!isSolutionRevealed) {
                alert('Peer has unlocked the solutions tab!');
            }
            setIsInterviewer(true);
            setIsSolutionRevealed(true);
            isRunning = false;
        }
        socket.on('end-session', endSession);

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
    }, [navigateTo, isSolutionRevealed, socket, roomId]);

    const closeRoom = () => {
        setIsPromptOpen(false);
        setIsSolutionRevealed(true);
        socket.emit('end-session', `room-${roomId}`);
        alert('You have unlocked the solutions tab!');
        setIsInterviewer(true);
    };
    
    const prompt = () => {
        if (isSolutionRevealed) {
            alert('Solution is already unlocked. Check the solution tab');
            return;
        }
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
                message={"Are you sure you would like to unlock the solution for both you and your peer?"}
                isOpen={isPromptOpen}
                handleYes={closeRoom}
                handleNo={undoPrompt}
            />
            <Typography>Coding session with {peer}</Typography>
            <QuestionBox questionId={questionId} interviewer={isInterviewer} />
            <CodeBox roomId={roomId} socket={socket}/>
            <Button variant="contained" onClick={prompt}>Reveal Solution</Button>
        </Box>
    );
}

export default RoomPage;
