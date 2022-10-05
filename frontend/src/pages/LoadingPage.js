import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Countdown from 'react-countdown';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { io } from 'socket.io-client'; 
import { URI_MATCHING_SVC } from '../configs';
import { useAuth0 } from "@auth0/auth0-react";

function LoadingPage() {

    const [matchid, setMatchId] = useState(0);

    let navigateTo = useNavigate();
    const location = useLocation();

    const { isAuthenticated, isLoading } = useAuth0();

    
    useEffect(() => {
        if (!location['state'] || !location.state['matchid']) {
            navigateTo('../selectdifficulty');
            return;
        }
        setMatchId(location.state.matchid);

        const socket = io(URI_MATCHING_SVC);
        socket.on('connect', () => {
            console.log(`Connected with id ${socket.id}`);
        });
        socket.emit('join-room', `match-${location.state.matchid}`);

        const timeoutId = setTimeout(() => {
            console.log('Matching failed');
            alert('No peer found for matching! Please try again another time');
            socket.disconnect(true);
            console.log(socket);
            navigateTo('../selectdifficulty');
        }, (30 + 1) * 1000);
        
        socket.on('provide-room', (roomid) => {
            console.log(`server provided room ${roomid}`);
            socket.disconnect(true);
            console.log(socket);
            clearTimeout(timeoutId);
            navigateTo(`../room/${roomid}`);
            return;
        });

    }, [location, navigateTo]);

    // TODO: listen to socket based on match id
    if (isLoading) {
        return <div>Loading ...</div>;
    }
    
    // not authenticated = back to homepage bich
    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }
    return (
        <Box>
            <Typography>Loading match 30s using match id {matchid}</Typography>
            <Countdown 
                date={Date.now() + 30 * 1000}
            >
            </Countdown>
        </Box>
    );
}

export default LoadingPage;
