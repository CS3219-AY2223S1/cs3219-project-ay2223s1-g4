import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Countdown from 'react-countdown';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function LoadingPage() {
    const [matchid, setMatchId] = useState(0);

    let navigateTo = useNavigate();
    const location = useLocation();
    
    useEffect(() => {
        if (!location['state'] || !location.state['matchid']) {
            navigateTo('../selectdifficulty');
            return;
        }
        setMatchId(location.state.matchid);
        setTimeout(() => {
            console.log('Matching failed');
            alert('No peer found for matching! Please try again another time')
            navigateTo('../selectdifficulty');
        }, (30 + 1) * 1000);
    }, [location, navigateTo]);

    // TODO: listen to socket based on match id
    
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
